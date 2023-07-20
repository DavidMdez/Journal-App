import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dmadnkwsi',
  api_key: '763735625123579',
  api_secret: 'uJb-y6zDKsDGiz7k8Kqa2AjUxnA',
  secure: true
});

describe('Pruebas en fileUpload', () => { 

  test('debe de subir el archivo a cloudinary', async() => { 
    const imageURl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';
    const resp = await fetch( imageURl );
    const blob = await resp.blob();
    const file = new File([blob], 'Foto.jpg');

    const url = await fileUpload( file );
    expect( typeof url ).toBe('string');

    // Borrar imagen por ID
    const segments = url.split('/');
    const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
    const clodResp = await cloudinary.api.delete_resources( [ 'journal/' + imageId ], {
      resource_type: 'image'
    } );
    // console.log( clodResp );
  });

  test('debe de retornar null', async() => { 
    const file = new File([], 'Foto.jpg');

    const url = await fileUpload( file );
    expect( url ).toBe( null );  
  })

});