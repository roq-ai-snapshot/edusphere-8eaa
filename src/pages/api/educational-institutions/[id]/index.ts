import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { educationalInstitutionValidationSchema } from 'validationSchema/educational-institutions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.educational_institution
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEducationalInstitutionById();
    case 'PUT':
      return updateEducationalInstitutionById();
    case 'DELETE':
      return deleteEducationalInstitutionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEducationalInstitutionById() {
    const data = await prisma.educational_institution.findFirst(
      convertQueryToPrismaUtil(req.query, 'educational_institution'),
    );
    return res.status(200).json(data);
  }

  async function updateEducationalInstitutionById() {
    await educationalInstitutionValidationSchema.validate(req.body);
    const data = await prisma.educational_institution.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteEducationalInstitutionById() {
    const data = await prisma.educational_institution.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
