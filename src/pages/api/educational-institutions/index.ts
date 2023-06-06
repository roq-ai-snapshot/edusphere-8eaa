import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { educationalInstitutionValidationSchema } from 'validationSchema/educational-institutions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEducationalInstitutions();
    case 'POST':
      return createEducationalInstitution();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEducationalInstitutions() {
    const data = await prisma.educational_institution
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'educational_institution'));
    return res.status(200).json(data);
  }

  async function createEducationalInstitution() {
    await educationalInstitutionValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.course?.length > 0) {
      const create_course = body.course;
      body.course = {
        create: create_course,
      };
    } else {
      delete body.course;
    }
    if (body?.school_administrator?.length > 0) {
      const create_school_administrator = body.school_administrator;
      body.school_administrator = {
        create: create_school_administrator,
      };
    } else {
      delete body.school_administrator;
    }
    if (body?.student_support?.length > 0) {
      const create_student_support = body.student_support;
      body.student_support = {
        create: create_student_support,
      };
    } else {
      delete body.student_support;
    }
    if (body?.teacher?.length > 0) {
      const create_teacher = body.teacher;
      body.teacher = {
        create: create_teacher,
      };
    } else {
      delete body.teacher;
    }
    const data = await prisma.educational_institution.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
