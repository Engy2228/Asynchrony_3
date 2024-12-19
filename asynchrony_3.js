const FOTO_URL = 'https://api.slingacademy.com/v1/sample-data/photos'
const arrayIds = []
const dataContainer = document.querySelector('#data-container')

const createFotoElement = (photo) => {
  const $photoItem = document.createElement('li')
  $photoItem.className = 'photo-item'

  const $image = document.createElement('img')
  $image.className = 'photo-item__image'
  $image.src = photo.url

  const $title = document.createElement('h3')
  $title.className = 'photo-item__title'
  $title.textContent = photo.title

  $photoItem.append($image, $title)

  return $photoItem
}

const getFastestLoadedPhoto = (ids) => {
  toggleLoader()
  const requests = ids.map((id) =>
    fetch(`${FOTO_URL}/${id}`, {
      method: 'GET',
    })
  )
  Promise.race(requests)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request error')
      }
      return response.json()
    })
    .then((photo) => {
      console.log('photo', photo)
      const photoElement = createFotoElement(photo)
      dataContainer.append(photoElement)
      arrayIds.push(photoElement)
    })

    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      toggleLoader()
    })
}
getFastestLoadedPhoto([60, 12, 55])

function toggleLoader() {
  const $loader = document.querySelector('#loader')
  const isHidden = $loader.hasAttribute('hidden')
  console.log(isHidden)
  if (isHidden) {
    $loader.removeAttribute('hidden')
  } else {
    $loader.setAttribute('hidden', '')
  }
}
