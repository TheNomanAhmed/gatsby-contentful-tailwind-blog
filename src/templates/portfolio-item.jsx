import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import SiteMetadata from "../components/SiteMetadata"
import Button from "../components/Button"
import Cards from "../components/Cards"
import Carousel from "../components/Carousel"
import Newsletter from "../components/Newsletter"
import Layout from "../layouts/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

export default props => {
  const {
    description,
    gallery,
    name,
    related,
    summary,
    richDescription,
    thumbnail,
    url,
  } = props.data.item
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className=" text-blue-900 text-xl">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className=" text-blue-800">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-blue-700">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-blue-600">{children}</h4>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
        <img
          className="w-full"
          src={`https:${node.data.target.fields.file["en-US"].url}`}
        />
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => (
        <a
          className="w-full"
          href={`https:${node.data.target.fields.slug["en-US"]}`}
        ></a>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node, children) => (
        <a className="w-full" href={`https:${node.data.target}`}>
          Embed
        </a>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="copy">{children}</p>
      ),
    },
    renderMark: {},
  }

  return (
    <Layout>
      <SiteMetadata
        title={name}
        description={summary}
        image={thumbnail.localFile.publicURL}
      />
      <div className="bg-gray-0 py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-2/3 pb-8">
              <Img
                fluid={thumbnail.localFile.childImageSharp.fluid}
                alt={name}
              />
            </div>
            <div className="w-full lg:w-1/3 lg:pl-8 xl:pl-12">
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-1">
                {name}
              </h1>
              <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-600 sm:text-2xl">
                {summary}
              </h2>
              {description && (
                <div className="my-4 text-base text-gray-700 whitespace-pre-line">
                  {description.description}
                </div>
              )}
              {url && (
                <div className="mt-8">
                  <Button href={url}>More info</Button>
                </div>
              )}
            </div>
            <div className="w-full lg:w-full pb-8">
              {gallery.map(image => {
                return (
                  <div key={image.id} className="w-full my-2">
                    <Img
                      fluid={image.localFile.childImageSharp.fluid}
                      alt={image.title}
                    />
                  </div>
                )
              })}
            </div>
            <div>
              {documentToReactComponents(richDescription.json, options)}
            </div>
          </div>
        </div>
      </div>
      {related && (
        <div className="bg-gray-100 py-12 lg:py-16">
          <div className="container">
            <h2 className="text-3xl sm:text-4xl leading-tight font-extrabold tracking-tight text-gray-900 mb-8">
              You may also like
            </h2>
          </div>
          <Cards items={related} hideLastItemOnMobile={true} />
        </div>
      )}
      <Newsletter />
    </Layout>
  )
}

export const query = graphql`
  query PortfolioItemQUery($slug: String!) {
    item: contentfulPortfolio(slug: { eq: $slug }) {
      description {
        description
      }
      gallery {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 3000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
      }
      name
      related {
        ...PortfolioCard
      }
      summary
      richDescription {
        json
      }
      thumbnail {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      url
    }
  }
`
