import { useQuery } from 'react-query'
import { APP_API_URL } from '../../../config'
import { fetchApi } from '../../../library/fetch'
import { getSession } from '../../../utilities/session'

type ReferenceList = {
  status: true
  list: [
    {
      id: string
      time: number
      status: boolean
      baseSrc: string
      list: [
        {
          available: boolean
          data: number
          path: string
        }
      ]
      _id: string
    }
  ]
  url: string
}

const getReferenceList = async (): Promise<ReferenceList> => {
  return await fetchApi(`${APP_API_URL}/api/reference`, { session: getSession() })
}

export const useReferenceList = () => {
  return useQuery({
    queryKey: 'referenceList',
    queryFn: async () => await getReferenceList(),
  })
}
