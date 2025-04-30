export const errorFomatter = (error) => {
  const { message, extensions } = error;

  // Handle Authentication Errors (401)
  if (message === 'Unauthorized' || extensions?.code === 'UNAUTHENTICATED') {
    return {
      ...error,
      extensions: {
        ...extensions,
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    };
  }

  // Handle Forbidden Access (403)
  if (message === 'Forbidden' || extensions?.code === 'FORBIDDEN') {
    return {
      ...error,
      extensions: {
        ...extensions,
        code: 'FORBIDDEN',
        http: { status: 403 },
      },
    };
  }

  // Handle Bad Request (400)
  if (
    message.includes('Validation') ||
    extensions?.code === 'BAD_USER_INPUT' ||
    extensions?.code === 'GRAPHQL_VALIDATION_FAILED'
  ) {
    return {
      ...error,
      extensions: {
        ...extensions,
        code: 'BAD_REQUEST',
        http: { status: 400 },
      },
    };
  }

  // Handle Not Found (404)
  if (message.includes('Not Found') || extensions?.code === 'NOT_FOUND') {
    return {
      ...error,
      extensions: {
        ...extensions,
        code: 'NOT_FOUND',
        http: { status: 404 },
      },
    };
  }

  // Handle Internal Server Error (500)
  if (
    message.includes('Internal Server Error') ||
    extensions?.code === 'INTERNAL_SERVER_ERROR'
  ) {
    return {
      ...error,
      extensions: {
        ...extensions,
        code: 'INTERNAL_SERVER_ERROR',
        http: { status: 500 },
      },
    };
  }

  // Default case (if no match)
  return {
    ...error,
    extensions: {
      ...extensions,
      http: { status: 500 }, // Fallback to 500 if unknown error
    },
  };
};
