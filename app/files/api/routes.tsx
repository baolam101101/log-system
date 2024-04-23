export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY!,
      },
    })
    const files = await res.json()
   
    return Response.json({ files })
  }