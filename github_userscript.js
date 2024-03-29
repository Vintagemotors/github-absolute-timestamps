// External script file: github_userscript.js


(function() {
    'use strict';

window.addEventListener('load', function() {
    GM_addStyle('.table-list-header-toggle):not(.d-flex) { white-space: nowrap !important; max-width: 180px !important; }');
});

window.addEventListener('load', function() {
    var observer = new MutationObserver(replaceRelativeDates);
    observer.observe(document.body, { childList: true, subtree: true });
});


    function isExcluded(element) {
        // Check if the element has the exclude-from-script class
        return element.classList.contains('exclude-from-script');
    }

    function replaceRelativeDates() {
        var relativeTimeElements = document.querySelectorAll('relative-time');

        relativeTimeElements.forEach(function(element) {
            // Exclude elements with the exclude-from-script class
            if (!isExcluded(element)) {
                var dateTimeAttribute = element.getAttribute('datetime');
                if (dateTimeAttribute) {
                    var absoluteDate = new Date(dateTimeAttribute);
                    var titleAttribute = element.getAttribute('title');
                    var relativeDate = titleAttribute ? titleAttribute : '';

                    var timeDifference = Date.now() - absoluteDate;
                    var daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                    var relativeTimeString = getRelativeTimeString(daysAgo);

                    // Create a new span element
                    var newSpan = document.createElement('span');
                    newSpan.className = 'no-wrap';
                    newSpan.title = 'Relative date: ' + relativeDate;
                    newSpan.textContent = absoluteDate.toLocaleString() + ' - ' + relativeTimeString;

                    // Replace the original relative-time element with the new span
                    element.parentNode.replaceChild(newSpan, element);
                }
            }
        });

        // Display last edit time for comments
        var commentContainers = document.querySelectorAll('.js-comment-container');

        commentContainers.forEach(function(container) {
            var timestampElement = container.querySelector('.js-timestamp');
            var editedInfo = container.querySelector('.edited-info');

            if (timestampElement && !editedInfo) {
                var editedElement = timestampElement.cloneNode(true);
                editedElement.classList.add('edited-info');
                editedElement.textContent = ' (Edited)';

                container.appendChild(editedElement);
            }
        });
    }

    function getRelativeTimeString(daysAgo) {
        if (daysAgo === 0) {
            return 'Today';
        } else if (daysAgo === 1) {
            return '1 Day Ago';
        } else if (daysAgo < 31) {
            return daysAgo + ' Days Ago';
        } else {
            var monthsAgo = Math.floor(daysAgo / 30);
            if (monthsAgo === 1) {
                return '1 Month Ago';
            } else if (monthsAgo < 12) {
                return monthsAgo + ' Months Ago';
            } else {
                var yearsAgo = Math.floor(monthsAgo / 12);
                if (yearsAgo === 1) {
                    return '1 Year Ago';
                } else {
                    return yearsAgo + ' Years Ago';
                }
            }
        }
    }

    // Run the function initially
    replaceRelativeDates();

    // Use MutationObserver to handle dynamically loaded content
    var observer = new MutationObserver(replaceRelativeDates);
    observer.observe(document.body, { childList: true, subtree: true });
})();

    var observer = new MutationObserver(replaceRelativeDates);
    observer.observe(document.body, { childList: true, subtree: true });
})();
