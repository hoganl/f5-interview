export default function autoBind(classComponent) {
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype);
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this);
    }
  });
}

export const validateCandidate = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION ERROR: candidate must have an id');
  }

  if (!payload.name) {
    throw new Error('VALIDATION ERROR: candidate must have a name');
  }

  if (!payload.acceptance) {
    throw new Error('VALIDATION ERROR: candidate must have an acceptance status');
  }
};
