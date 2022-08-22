//Main Variable 
let theIput = document.querySelector( ".get-repos input" );
let getButton = document.querySelector( ".get-button" );
let reposData = document.querySelector( ".show-data" );

getButton.onclick = function ()
{
    getRepos();
}
//Get Repos Function 
function getRepos ()
{
    if ( theIput.value === "" ) //if the is empty
    {
        reposData.innerHTML = `<span>Please Write Github Username.</span>`;
    } else
    {
        fetch( `https://api.github.com/users/${ theIput.value }/repos` )
            .then( ( response ) => response.json() )
            .then( ( repositories ) =>
            {
                //Empty The Container
                reposData.innerHTML = "";

                repositories.forEach( ( repo ) =>
                {
                    //Create The Main Div Element
                    let mainDiv = document.createElement( "div" );

                    //Create Repo Name Text 
                    let repoName = document.createTextNode( repo.name );

                    //Append The Text To Main Div 
                    mainDiv.appendChild( repoName );

                    //Create Repo Url Anchor 
                    let theUrl = document.createElement( "a" );

                    //Create Repo Url Text 
                    let theUrlText = document.createTextNode( "Visit" );

                    //Append The Repo Url Text To Achor Tag 
                    theUrl.appendChild( theUrlText );

                    //Add The Hypertext  Referance "href" 
                    theUrl.href = `https://github.com/${ theIput.value }/${ repo.name }`;

                    //Set Attribute Target Blank
                    theUrl.setAttribute( 'target', '_blank' );

                    //Append the Url Anchor To The Main Div 
                    mainDiv.appendChild( theUrl );

                    //Create Stars Count Span 
                    let starsSpan = document.createElement( "span" );

                    //Create The Stars Count Text 
                    let starsText = document.createTextNode( `Satrs ${ repo.stargazers_count }` );

                    //Add Stars Count Text To Stars Span 
                    starsSpan.appendChild( starsText );

                    //Append Stars Count Span To Main Div 
                    mainDiv.appendChild( starsSpan );

                    //Add Class On Main Div 
                    mainDiv.className = "repo-box";

                    //Append The Main Div To Container 
                    reposData.appendChild( mainDiv );
                } );
            } );
    }
}