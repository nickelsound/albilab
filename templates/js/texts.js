var textsAuthors=
[
    // align: [desktop, mobile], 0 = left, 1 = right
    {
        "id": "alca",
        "name": "Alena Plzáková",
        "img": "./img/h_alca.jpg",
        "align": [0, 0],
        "position": "Product manager & designer (product developer), Albi ČR",
        "text": "Enthusiastic about developing products for children, overcoming challenges, finding solutions, prototyping, 3D printing and crafts. Lover of plants, gardens and her family.       "
    },
    {
        "id": "jirka",
        "name": "Jiří Trojánek",
        "img": "./img/h_jirka.jpg",
        "align": [0, 0],
        "position": "Designer & Photograph",
        "text": "A former photographer of Zoo Prague, now a graphic designer and creative professional. A happy father, lover of music, good food, drinks, culture and friends. Also a collector of vinyl records, art, books about art and architecture."
    },
    {
        "id": "vitek",
        "name": "Vít Latzel",
        "img": "./img/h_vitek.jpg",
        "align": [0, 0],
        "position": "Scientist, Deputy director, Botanický ústav AV ČR, v. v. i. (Institute of Botany)",
        "text": "She is interested in the environmental consequences of epigenetic memory in plants. In his spare time, he likes to spend time with his family, in nature, reading, following technological innovations and taking pictures of all kinds of things."
    },
    {
        "id": "ondra",
        "name": "Ondřej Nentvich",
        "img": "./img/h_ondra.jpg",
        "align": [1, 0],
        "position": "HW & FW Designer, Freelancer",
        "text": "Enthusiast in the Embedded electronics and IoT systems, their development, programming and testing. Likes new challenges in this field and exploring new possiblities and capabilities in this branch. Outside of work, he enjoys the outdoors whether on foot, bike or motorcycle, amateur photography or playing baker."
    },
    {
        "id": "mira",
        "name": "Mira Veselá",
        "img": "./img/h_mira.jpg",
        "align": [1, 0],
        "position": "Designer, Freelancer",
        "text": "She focuses mainly on product design and projects with interdisciplinary overlap, where there is room for finding creative solutions. She balances digital creation with working with real materials – textiles and plant pigments. In general, she is very interested in alternative materials and circularity in design. Her hobbies include dancing, hiking and bike-packing."

    },
    {
        "id": "albilab",
        "name": "AlbiLAB Team",
        "img": "./img/AlbiLAB.jpg",
        "position": "",
        "align": [1, 0],
        "text": ""
    }
];

var mobile = 0;

if(jQuery.browser.mobile){
    mobile = 1;
}

for (var i = 0; i < textsAuthors.length; i++) {
    var author = textsAuthors[i];
    var authorID = "author_" + author["id"];
    var element = document.getElementById(authorID);

    if(element !== null){
        var align = author["align"][mobile];
        if(align === 1){
            element.innerHTML = 
            '<h1 class="about_header">' + author["name"] + '</h1>' +
            '<div class="about_row">' + 
                '<div class="about_text"><i>' + author["position"] + '</i><br/>' + author["text"] + '</div>' + 
                '<div class="about_photo"><img class="about_photo_img" data-src="' + author["img"] + '"/></div>'+ 
            '</div>';
        }
        else{
            element.innerHTML = 
            '<h1 class="about_header">' + author["name"] + '</h1>' +
            '<div class="about_row">' + 
                '<div class="about_photo"><img class="about_photo_img" data-src="' + author["img"] + '"/></div>'+ 
                '<div class="about_text"><i>' + author["position"] + '</i><br/>' + author["text"] + '</div>' + 
            '</div>';
        }
        continue;
    }

    element = document.getElementById("about_albilab");
    if(element !== null){
            element.innerHTML = 
            '<h1 class="about_header">' + author["name"] + '</h1>' +
            '<div style="margin: 20px;"><img src="' + author["img"] + '"/></div>'+ 
            '<div class="about_text" style="padding-top: 50px;">' + author["text"] + '</div>' ;
    }
}

jQuery(function () {
    var $images = jQuery('.about_photo_img');
    var lastLoadIndex = 0;
    var loadNextImage = function () {
        if ($images.length === lastLoadIndex) {
            return;
        }
        $images.eq(lastLoadIndex).attr('src', $images.eq(lastLoadIndex).attr('data-src'));
        lastLoadIndex += 1;
    };
    $images.on('load', loadNextImage);
    loadNextImage();
});
