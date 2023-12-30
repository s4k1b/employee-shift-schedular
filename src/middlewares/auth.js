import jwt from 'jsonwebtoken'

const publicRoutes = [
  '/auth/register',
  '/auth/login'
]

function isPublicRoute (url) {
  return publicRoutes.includes(url)
}

function extractAccessTokenFromCookie (cookies) {
  return cookies.access_token || ''
}

async function verifyAccessToken (accessToken) {
  const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET)
  return decoded
}

function onValidAccessToken (resp, user, next) {
  resp.locals.userEmail = user.email
  next()
}
function onInvalidAccessToken (next, e) {
  const error = new Error(e.message)
  error.statusCode = 401
  error.name = 'Unauthorized'
  next(error)
}

export default async function (req, resp, next) {
  if (isPublicRoute(req.url)) {
    // ignore public routes
    next()
  } else {
    // validate the jwt for private routes
    try {
      const accessToken = extractAccessTokenFromCookie(req.cookies)
      if (accessToken) {
        const user = await verifyAccessToken(accessToken)
        onValidAccessToken(resp, user, next)
      } else {
        throw new Error('No access_token cookie present')
      }
    } catch (e) {
      onInvalidAccessToken(next, e)
    }
  }
}
