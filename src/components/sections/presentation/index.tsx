import Title from '@/components/ui/title'

export default function Presentation() {
  return (
    <section id='presentacion' className='bg-primary h-auto  lg:min-h-screen w-full  '>
        <Title title='Video' active='institucional' className='pt-12 2xl:px-28 px-6 lg:px-12'/>
        <div className='h-auto lg:h-screen w-full flex items-center justify-center lg:pb-32 py-12 lg:py-0 '>
          <div className='lg:flex  items-center justify-center  lg:max-w-5xl 2xl:max-w-6xl mx-auto lg:px-12 2xl:px-28  w-full'>
              <iframe width="100%" height="522" src="https://www.youtube.com/embed/SGzOQ0R_NfM?si=hpq0HgM5V_-dR76y"  title="Congreso de Educacion Humanista 2024 Video" className='rounded hidden lg:block' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <iframe width="100%" height="232" src="https://www.youtube.com/embed/SGzOQ0R_NfM?si=hpq0HgM5V_-dR76y"  title="Congreso de Educacion Humanista 2024 Video" className='rounded lg:hidden block aspect-video ' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>

    </section>
  )
}
