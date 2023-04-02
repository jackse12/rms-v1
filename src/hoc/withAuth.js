import authMiddleware from '../middleware/authMiddleware'

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    return <WrappedComponent {...props} />
  }

  AuthenticatedComponent.getInitialProps = async (context) => {
    await authMiddleware(context.req, context.res, null)

    const pageProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context))

    return { ...pageProps }
  }

  return AuthenticatedComponent
}

export default withAuth