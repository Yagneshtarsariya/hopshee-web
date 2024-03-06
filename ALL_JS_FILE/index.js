$(document).ready(function () {
    const aid = getCookie("admin_id");
    $('#searchInput').on('input', function () {
        const searchValue = $(this).val().toLowerCase();

        // Always show the search input
        $('#searchInput').show();

        // Loop through each list item and show based on search input
        $('#nav_search_item li').each(function () {
            const listItemText = $(this).text().toLowerCase();
            $(this).toggle(listItemText.includes(searchValue));
        });
    });
    if (aid != null && aid.length > 0) {
    } else {
        window.location.replace("login.html");
    }
    // Replace these with the actual doctor IDs you want to fetch
    const doctorIds = [41, 42]; // For example, fetching data for doctors with IDs 1 and 2

    // Loop through the doctor IDs and fetch data for each doctor
    doctorIds.forEach(function (doctorId) {

        // Make an API request to get data for the doctor with the given ID
        $.ajax({
            url: `${doctors}/${doctorId}`, // Replace with your API endpoint
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                const doctorData = response.data[0]; // Assuming the response contains doctor data
                const img_url = `${host}/${doctorData.image_url}`;
                // Create the HTML for the doctor card
                const doctorCard = `
            <div class="bg-white p-4  d-flex shadow bg-white rounded">
                <div style="margin-right:20px;">
                    <img src="${img_url}" alt="" height="100px" width="100px" style="border-radius:4px;">
                </div>
                <div>
                    <h4>${doctorData.doctor_name}</h4>
                    <p>${doctorData.speciality}</p>
                </div>
            </div><br>
            `;
                // Append the doctor card to the "doctorList" div
                $('#doctorList').append(doctorCard);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });
    const patientIds = [24, 25];
    patientIds.forEach(function (patientId) {
        // Make an API request to get data for the doctor with the given ID
        $.ajax({
            url: `${patients}/${patientId}`, // Replace with your API endpoint
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                const list = response.data;
                list.s
                const patientData = response.data[0]; // Assuming the response contains doctor data
                const img_url = `${host}/${patientData.image_url}`;
                // Create the HTML for the doctor card
                // $('#drname').text(doctorData.doctor_name); 
                const patientCrad = `
         <div class="bg-white p-4  d-flex shadow bg-white rounded">
         <div style="margin-right:20px;">
             <img src="${img_url}" alt="" height="100px" width="100px" style="border-radius:4px;">
         </div>
         <div>
            <h4>${patientData.patient_name}</h4>
            <p>${patientData.email_id}</p>
        </div>
        </div><br>
        `;
                // Append the doctor card to the "doctorList" div
                $('#patient-list').append(patientCrad);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    console.log(getCookie("admin_id"));

    const adminApi = `${admin}/7`;
    $.ajax({
        type: 'GET',
        data: 'json',
        url: adminApi,
        success: function (response) {

            console.log("response")
            $('#a').text(response.data[0].no_of_beds); // Update the navbar brand text
            $('#b').text(response.data[0].no_of_doctors); // Update the navbar brand text
            $('#c').text(response.data[0].no_of_bills); // Update the navbar brand text
            $('#d').text(response.data[0].no_of_ambules);
            $('#beds').val(response.data[0].no_of_beds);// Update the navbar brand text
            $('#ambulunce').val(response.data[0].no_of_ambules);// Update the navbar brand text
            $('#D_admin_name').text(response.data[0].admin_name); // Update the navbar brand text
            $('#D_admin_image').attr('src', response.data[0].image_url);// Update the navbar brand text

        },
        error: function (error) {
            console.logx("Error fetching doctor data:", error);
        }
    });
    $("#log_out").click(function () {
        console.log("log_out");
        setCookie("admin_id", "", 1);
        setCookie('employee_id', "", 1);
        window.location.replace("login.html");
    });
    $("#saveChangesButton").click(function () {
        // Get the updated values from input fields
        const updatedBeds = $("#beds").val();
        const updatedAmbulances = $("#ambulunce").val();
        const adminApi1 = admin;

        // Create an object with the updated data
        const updateData = {
            admin_id: getCookie('admin_id'),
            no_of_beds: updatedBeds,
            no_of_ambules: updatedAmbulances
        };

        // Send a POST request to update the data
        $.ajax({
            type: 'patch',
            url: adminApi1, // Replace with your server endpoint
            data: JSON.stringify(updateData),
            contentType: 'application/json',
            success: function (response) {
                // console.log(response);
                // Handle success, you can display a success message or perform other actions
                console.log('Data updated successfully', response);
                $("#successMessage").text("Update successful");

                // Close the modal after 2 seconds
                setTimeout(function () {
                    $('#exampleModal').modal('hide');
                }, 2000);

                // Reload the page after 2 seconds
                setTimeout(function () {
                    location.reload();
                }, 300);
            },
            error: function (error) {
                // Handle error, display an error message or log the error
                console.log('Error updating data:', error);
            }
        });
    });
});
