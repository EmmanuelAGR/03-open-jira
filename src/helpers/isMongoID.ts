import { NextResponse, type NextRequest } from 'next/server';

const  isMongoID = (req: NextRequest, ) => {
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '');
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if (!checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = '/api/bad-request';
      url.search = `?message=${id} is not a valid MongoID`;

      return NextResponse.redirect(url);
    }
  }
}

export default isMongoID;