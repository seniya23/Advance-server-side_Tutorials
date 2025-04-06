$(document).ready(function() {
    // Show loading indicator for the dropdown
    const dropdown = $('#celebrityDropdown');
    dropdown.append(new Option('Loading...', ''));
    dropdown.prop('disabled', true);
    
    // Load celebrity names into the dropdown on page load
    $.ajax({
        url: '/celebrities',
        method: 'GET',
        success: function(data) {
            dropdown.empty(); // Clear the loading option
            data.forEach(celebrity => {
                dropdown.append(new Option(celebrity, celebrity));
            });
            dropdown.prop('disabled', false);
        },
        error: function(err) {
            console.error('Failed to load celebrities:', err);
            dropdown.empty();
            dropdown.append(new Option('Failed to load', ''));
        }
    });

    // Update the input field when the dropdown selection changes
    $('#celebrityDropdown').change(function() {
        $('#celebrityName').val($(this).val());
    });

    // Handle form submission
    $('#celebrityForm').submit(function(event) {
        event.preventDefault();
        const celebrityName = $('#celebrityName').val();
        searchCelebrity(celebrityName);
    });
});

function searchCelebrity(name) {
    // Show loading indicator
    $('#results').html('<p>Loading...</p>');

    $.ajax({
        url: `/search?name=${encodeURIComponent(name)}`,
        method: 'GET',
        success: function(data) {
            displayResults(data);
        },
        error: function(err) {
            $('#results').html('<p>Error: Celebrity not found.</p>');
        }
    });
}

function displayResults(data) {
    const resultsDiv = $('#results');
    resultsDiv.empty();
    if (data) {
        resultsDiv.append(`<h2>${data.name}</h2>`);
        resultsDiv.append(`<p>Age: ${data.age}</p>`);
        resultsDiv.append(`<img src="${data.image}" alt="${data.name}">`);
        if (data.topFilms) {
            const filmList = $('<ul></ul>');
            data.topFilms.forEach(film => {
                filmList.append(`<li>${film}</li>`);
            });
            resultsDiv.append(filmList);
        }
    } else {
        resultsDiv.html('<p>No results found.</p>');
    }
}