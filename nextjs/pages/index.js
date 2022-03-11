import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>HOMEPAGE - IP LOG</title>
        <meta name="description" content="Homepage of IP management system" />
      </Head>
      <div>
        <Image loading="lazy" alt="Hero section image" src="https://source.unsplash.com/random/1600x600?apartment" width={1600} height={600} className="rounded-lg"/>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Etiam feugiat lorem non metus</h1>
              <div className="h-1 w-20 bg-brand rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Curabitur blandit mollis lacus. In ut quam vitae odio lacinia tincidunt. Fusce ac felis sit amet ligula pharetra condimentum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-secondary rounded-lg">
                <Image loading="lazy" alt="Hero section image" src="https://source.unsplash.com/random/600x600?building" width={600} height={600} className="rounded w-full object-cover object-center mb-6"/>
                <div className='py-4 px-6'>
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-secondary rounded-lg">
                <Image loading="lazy" alt="Hero section image" src="https://source.unsplash.com/random/600x600?nature" width={600} height={600} className="rounded w-full object-cover object-center mb-6"/>
                <div className='py-4 px-6'>
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-secondary rounded-lg">
                <Image loading="lazy" alt="Hero section image" src="https://source.unsplash.com/random/600x600?mountain" width={600} height={600} className="rounded w-full object-cover object-center mb-6"/>
                <div className='py-4 px-6'>
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                </div>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-secondary rounded-lg">
                <Image loading="lazy" alt="Hero section image" src="https://source.unsplash.com/random/600x600?programming" width={600} height={600} className="rounded w-full object-cover object-center mb-6"/>
                <div className='py-4 px-6'>
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
