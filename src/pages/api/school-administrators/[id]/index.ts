import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { schoolAdministratorValidationSchema } from 'validationSchema/school-administrators';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.school_administrator
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSchoolAdministratorById();
    case 'PUT':
      return updateSchoolAdministratorById();
    case 'DELETE':
      return deleteSchoolAdministratorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSchoolAdministratorById() {
    const data = await prisma.school_administrator.findFirst(
      convertQueryToPrismaUtil(req.query, 'school_administrator'),
    );
    return res.status(200).json(data);
  }

  async function updateSchoolAdministratorById() {
    await schoolAdministratorValidationSchema.validate(req.body);
    const data = await prisma.school_administrator.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteSchoolAdministratorById() {
    const data = await prisma.school_administrator.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
