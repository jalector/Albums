const API  = "https://jsonplaceholder.typicode.com";

let contenedor = $('#contAlbums');
let albums = [];
$.ajax({
    url: API + "/albums",
    method: 'GET',
    success: ( answer ) => {
        for(let element of answer ){
            let album = new Album( element.id, element.title, element.userId);
            let div = $('<div>', {
                class: "album animated",
                'data-albumId': album.id,
                html: $('<p>',{
                        html: "Name: " + album.title
                })                
            });

            
            album.html = div;
            album.setEvents();
            albums.push( album ); 
            contenedor.append( album.html ); 
        }
        
    },
    failure: ( answer ) => {
        console.log( answer );
    }
})


class Album {
    constructor(id, title, userId){
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.photos = [];        
        this.html = null; 
    }

    setEvents ( ) {
        this.html.click( ( event )=>  {
            this.html.addClass('bounce')
           
            this.getPhotos();
            setTimeout(() => {
                this.html.removeClass('bounce');
            },  2000);
            
        });
    }

    getPhotos ( ) {
        $.ajax({
            url: API + "/photos?albumId=" + this.id +"&_limit=7",
            method: 'GET',
            success: ( answer ) => {
                let cards = $('<div>', {
                    id: 'card-container' + this.id,
                    class:'card-columns'
                });

                for(let rawPhoto of answer){                    
                    let photo = new Photo(rawPhoto.id, rawPhoto.title, rawPhoto.url, rawPhoto.thumbnailUrl);
                   
                    let div = $('<div>', {
                        class: "card",
                        html: [$('<img>', {
                            class:'card-simg',
                            src: photo.miniUrl,
                            alt: photo.title
                        }),
                        $('<div>', {
                            class: 'card-body colorBlack',
                            html: $('<h6>',{
                                text: photo.title
                            })
                        })
                        ]
                    })

                    photo.html = div;                                         
                    this.photos.push( photo );
                    cards.append( photo.html );
                }
                this.html.append( cards ); 
            }, 
            failure: ( error ) => {
                console.err( error );
            }

        })
    }
}

class Photo {
    constructor(id, title, url, miniUrl){
        this.id = id;
        this.title = title;
        this.url = url;
        this.miniUrl = miniUrl;
        this.html = null;
        console.log( this );
    }
}