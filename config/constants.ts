export const API_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
    CALLBACK: '/api/auth/callback',
    SIGNUP: '/api/auth/signup',
  },
  GOALS: {
    GET_ALL: '/api/goals',
    GET_ONE: '/api/goals/[id]',
    CREATE: '/api/goals',
    UPDATE: '/api/goals/[id]',
    DELETE: '/api/goals/[id]',
  },
  PROGRESS: {
    GET_ALL: '/api/progress',
    GET_ONE: '/api/progress/[id]',
    CREATE: '/api/progress/[id]',
    UPDATE: '/api/progress/[id]',
    DELETE: '/api/progress/[id]',
  },
  SOCIAL: {
    GET_ALL: '/api/social',
    GET_ONE: '/api/social/[id]',
    CREATE: '/api/social',
    UPDATE: '/api/social/[id]',
    DELETE: '/api/social/[id]',
    COMMENT: '/api/social/[id]/comments',
  },
};

export const DATE_FORMAT = 'dd/MM/yyyy';