/*File Name: App.js, Student Names: Runali Patel - 301110236, Muksud Mahi - 301155894, Devanishi Patel - 301144152,
Tanisha Sharma - 300882730 , Sabah Hussein - 301161377 Date:14/07/2021 */
(function()
{
    function Start()
    {
        console.log("App started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                   window.location.assign('/survey-list');
                }
            });
        }
    }
    window.addEventListener("load", Start)
})();