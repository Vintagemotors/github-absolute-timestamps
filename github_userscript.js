// External script file: github_userscript.js

(function() {
    'use strict';

    console.log('Script is running');

    GM_addStyle('.no-wrap:not(.table-list-header-toggle):not(.d-flex) { white-space: nowrap !important; max-width: 180px !important; }');

    function isExcluded(element) {
        console.log('Checking exclusion for element:', element);
        return element.classList.contains('exclude-from-script');
    }

    function replaceRelativeDates() {
        console.log('Replacing relative dates');

        var relativeTimeElements = document.querySelectorAll('relative-time');

        relativeTimeElements.forEach(function(element) {
            console.log('Processing element:', element);

            if (!isExcluded(element)) {
                var dateTimeAttribute = element.getAttribute('datetime');
                if (dateTimeAttribute) {
                    var absoluteDate = new Date(dateTimeAttribute);
                    var titleAttribute = element.getAttribute('title');
                    var relativeDate = titleAttribute ? titleAttribute : '';

                    var timeDifference = Date.now() - absoluteDate;
                    var daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                    var relativeTimeString = getRelativeTimeString(daysAgo);

                    var newSpan = document.createElement('span');
                    newSpan.className = 'no-wrap';
                    newSpan.title = 'Relative date: ' + relativeDate;
                    newSpan.textContent = absoluteDate.toLocaleString() + ' - ' + relativeTimeString;

                    element.parentNode.replaceChild(newSpan, element);
                }
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

    replaceRelativeDates();

    var observer = new MutationObserver(replaceRelativeDates);
    observer.observe(document.body, { childList: true, subtree: true });
})();
