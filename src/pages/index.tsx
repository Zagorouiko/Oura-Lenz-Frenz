import { useExplorePublicationsQuery, PublicationSortCriteria } from 'graphql/generated'
import Feed from 'components/Feed'

export default function Home() {

  const { data, isLoading, error } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.TopCollected,
      },
    },
      {
        // Don't refetch the user comes back
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    )

    console.log(data) 

  return (  
    
    <div>
      {data?.explorePublications.items.map((publication) => (
        <Feed publication = { publication } key = { publication.id } />
      ))}
    </div>
  )
}
