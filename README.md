
#  HTML to React
This is a node tool which can assist you to convert html template to react component.







## Documentation
### Step 1: Configure HTML file
The tool will detect the components throught the comment HTML tags.
```html
 <!-- Wrapper -->
    <div id="wrapper" class="divided">
        <!-- SectionFirst -->
        <section>
            <h1>Frist Section</h1>
        </section>
         <!-- SectionSecond -->
        <section>
            <h1>Second Section</h1>
        </section>
    </div>
``` 
In this case, the tool assume that `Wrapper Component` contains `Section1 Component` and `Section2 Component`. 

### Step 2: Run code
Create a new file and then import `index.js`. 
```javascript
//sample.js

const createComponents = require('./index')
createComponents("./index.html", "Wrapper", "output")
``` 
The `createComponents` takes 3 parameter
| Params  | Type | Require | Description
| ------------- | ------------- | ------------- | ------------- |
| First  | string | yes | The path of HTML file  |
| Second | string | yes | Component's name |
| Third | string | yes | The path of output folder |

Execute code by `node sample`.








## Feedback

If you have any feedback, please reach out to us at quochbcontact@gmail.com

