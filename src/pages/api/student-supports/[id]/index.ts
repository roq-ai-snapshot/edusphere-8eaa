import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { studentSupportValidationSchema } from 'validationSchema/student-supports';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.student_support
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStudentSupportById();
    case 'PUT':
      return updateStudentSupportById();
    case 'DELETE':
      return deleteStudentSupportById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudentSupportById() {
    const data = await prisma.student_support.findFirst(convertQueryToPrismaUtil(req.query, 'student_support'));
    return res.status(200).json(data);
  }

  async function updateStudentSupportById() {
    await studentSupportValidationSchema.validate(req.body);
    const data = await prisma.student_support.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteStudentSupportById() {
    const data = await prisma.student_support.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
