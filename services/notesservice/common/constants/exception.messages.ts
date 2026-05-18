export enum EXCEPTION_MESSAGES {
  NOT_FOUND = 'The requested resource was not found or has been soft-deleted.',
  BAD_REQUEST = 'The request payload is invalid or poorly formatted.',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred on the server.',
  UNAUTHORIZED = 'You are not authorized to perform this action.',
}

export enum NOTE_MESSAGES {
  NOT_FOUND = 'Note not found or has been soft-deleted.',
  CREATE_SUCCESS = 'Note has been successfully saved.',
}