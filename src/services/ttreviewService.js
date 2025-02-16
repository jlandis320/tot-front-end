import * as tokenService from "./tokenService"

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/ttreviews`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {})
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (ttreviewData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ttreviewData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteTTReview = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${tokenService.getToken()}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export{
  index,
  create,
  deleteTTReview as delete,
}