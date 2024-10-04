const createElement = (tag, properties) => Object.assign(document.createElement(tag), properties);

const createGalleryImage = ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
   const newHyperLink = createElement("a", {className: "gallery-link",
                                            href: largeImageURL});

   const newImage = createElement("img", {className: "gallery-image",
                                          src: webformatURL,
                                          alt: tags});

   const descDiv = createElement("div", {className: "desc-box"});
   descDiv.innerHTML =  '<div class="inner-desc-box" >' +
                        '<h4 class="gallery-headline">Likes</h4> ' + 
                        `<p class="gallery-desc">${likes}</p></div>` +

                        '<div class="inner-desc-box" >' +
                        '<h4 class="gallery-headline">Views</h4> ' + 
                        `<p class="gallery-desc">${views}</p></div>` +

                        '<div class="inner-desc-box" >' +
                        '<h4 class="gallery-headline">Comments</h4> ' + 
                        `<p class="gallery-desc">${comments}</p></div>` +

                        '<div class="inner-desc-box" >' +
                        '<h4 class="gallery-headline">Downloads</h4> ' + 
                        `<p class="gallery-desc">${downloads}</p></div>`

   newHyperLink.append(newImage);
   newHyperLink.append(descDiv);
   return newHyperLink;
};

export const createListItem = (images, gallery) => {
   const list = images.map(createGalleryImage)
                      .map(image => {
                               const li = createElement("li");
                               li.append(image);
                               return li;
                      }); 

   const fragment = document.createDocumentFragment();
   fragment.append(...list);

   gallery.appendChild(fragment);
};