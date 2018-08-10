function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('players');
const url = 'https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/dii-test/data.json#';
fetch(url).then((resp) => resp.json())
    .then(function(data) {
        let players = data;

        function json2table(json, classes) {
            var cols = Object.keys(json[0]);

            var headerRow = '';
            var bodyRows = '';

            classes = classes || '';

            function capitalizeFirstLetter(string) {
                return string
                    .charAt(0)
                    .toUpperCase() + string.slice(1);
            }

            cols
                .map(function(col) {
                    headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
                });

            json.map(function(row) {
                bodyRows += '<tr>';

                cols.map(function(colName) {
                    bodyRows += '<td>' + row[colName] + '</td>';
                })

                bodyRows += '</tr>';
            });

            return '<table class="' + classes + '"><thead><tr>' + headerRow + '</tr></thead><tbody>' + bodyRows + '</tbody></table>';
        }
        Sortable.create(sortableRows, { /* options */ });

        document
            .getElementById('playerTable')
            .innerHTML = json2table(data, 'table');
    })
    .catch(function(error) {
        console.log(error);
    });