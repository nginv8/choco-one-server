export default async (policyContext) => {
  const { user } = policyContext.state;

  if (user) {
    return true;
  } else {
    return false;
  }
};
