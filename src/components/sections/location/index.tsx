import IconUbicacion from '@/components/icons/icon-ubicacion'
import Title from '@/components/ui/title'

export default function Location() {
  return (
    <section id='encontranos' className='h-auto lg:h-screen bg-primary pb-8 lg:pb-0'>
      <Title title='Dónde' active='encontranos' className='2xl:pl-28 pl-6  lg:pl-12 pt-12 mb-12' />

      <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-16 justify-center px-6 lg:px-12 2xl:px-28'>

          <section className='relative w-full lg:w-auto'>
  
            <h4 className='text-sm lg:text-lg text-gray-100 flex items-center gap-x-1.5'>
              <span className='rounded-full p-0.5 bg-gradient-to-r from-white via-white to to-secondary text-primary/60'><IconUbicacion /></span>
               Caseros 745, X5000 AHO, <strong className='font-medium'>Córdoba</strong></h4>

            <div className='flex items-center w-full justify-between gap-x-12'>
              <h3 className='text-xl lg:text-3xl font-bold text-white mb-4 mt-2'>Colegio Santo Tomás de <br/> Las Escuelas Pías</h3>
              <img src='/assets/adherents/Escuelas-Pias-argentina.png' className='opacity-50 w-20 h-20 hidden lg:block'/>
            </div>

          
          </section>

          <div className='  h-96 lg:h-[28.125rem] w-full lg:w-[37.5rem] 2xl:w-[43.75rem]'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.9443282247335!2d-64.1950681!3d-31.415659899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a27ffd7e1269%3A0xa7be672f7cff6d27!2sColegio%20Santo%20Tom%C3%A1s%20de%20Las%20Escuelas%20P%C3%ADas!5e0!3m2!1ses-419!2sar!4v1721801183151!5m2!1ses-419!2sar" className='rounded-2xl rder-2 border-white' width="100%" height="100%" style={{border : 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

      </div>
    </section>
  )
}
