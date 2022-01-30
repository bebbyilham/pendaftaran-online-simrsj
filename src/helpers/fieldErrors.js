/* eslint-disable import/no-anonymous-default-export */
export default (errors) => {
  const fieldErrors =
    typeof errors === "object" &&
    errors?.reduce((ListErrors, error) => {
      if (error?.field) ListErrors[error.field] = error;
      return ListErrors;
    }, {});
  return fieldErrors;
};
