import BedPage from '@/components/bed/bed-page';

async function page({ params }: { params: { bed_id: string } }) {
    const { bed_id } = params;
    
    return (
        <div className='w-full h-full dark:bg-gray-900'>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
                <BedPage bedId={bed_id}/>
            {/* </Suspense> */}
        </div>
  )
}

export default page