import * as tokenService from "./tokenService";

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/restaurants`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {});
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (url) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createRating = async (id, ratingData) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateRating = async (id,ratingid,ratingData) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/rating/${ratingid}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ratingData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export{
  index,
  create,
  show,
  createRating,
  updateRating,
}
