import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { learningPathValidationSchema } from 'validationSchema/learning-paths';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.learning_path
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLearningPathById();
    case 'PUT':
      return updateLearningPathById();
    case 'DELETE':
      return deleteLearningPathById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLearningPathById() {
    const data = await prisma.learning_path.findFirst(convertQueryToPrismaUtil(req.query, 'learning_path'));
    return res.status(200).json(data);
  }

  async function updateLearningPathById() {
    await learningPathValidationSchema.validate(req.body);
    const data = await prisma.learning_path.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteLearningPathById() {
    const data = await prisma.learning_path.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
