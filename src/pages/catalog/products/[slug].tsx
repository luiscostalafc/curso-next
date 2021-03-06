import { client } from '@/lib/prismic'
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'

interface ProductProps {
  product: Document
}


import { useRouter } from 'next/router'

export default function Product({ product }: ProductProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }
  


return (
  <div>
    <h1>
      {PrismicDOM.RichText.asText(product.data.title)}
    </h1>

    <img src={product.data.thumbanil.url} width="300" alt="" />

    <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description)}}>

      <p>Price: ${product.data.price}</p>

    </div>
  </div>
)
}

export const getStaticPaths: GetStaticPaths = async () => {
 return {
   paths: [],
   fallback: true,
 }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
 const { slug } = context.params;

 const product = await client().getByUID('product', String(slug), {});


 return {
   props: {
     product,
   },
   revalidate: 5,
 }
}