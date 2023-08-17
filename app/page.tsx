
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import Banner from './../app/components/Banner';
import LargeCard from './../app/components/LargeCard';
import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import data from './data.json';
import SmallCard from './../app/components/SmallCard';
interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Banner/>
      <Container>
      
          <h2 className="py-5 text-2xl font-semibold md:text-3xl">
            Explore Nearby
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.exploreData?.map((item) => (
              <SmallCard
                image={item.img}
                distance={item.distance}
                location={item.location}
                key={item.location}
              />
            ))}
          </div>
       
        
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >

          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
      <LargeCard
          image="/card.webp"
          description="Wishlists curated by Airbnb"
          title="The Greatest Outdoors"
          buttonText="Get Inspired"
        />
    </ClientOnly>
  )
}

export default Home;
