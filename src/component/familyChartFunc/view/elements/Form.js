import _ from "lodash";

export function Form({datum, rel_datum, store, rel_type, card_edit, postSubmit, card_display, edit: {el, open, close}}) {
  setupFromHtml();
  open();


  function setupFromHtml() {
    el.innerHTML = (`
      <div class="modal-content">
        <form>
          <div>
            <div style="text-align: left">
              <span style="display: ${datum.to_add || !!rel_datum ? 'none' : null}; float: right; cursor: pointer" class="red-text delete text-red-700">delete</span>
            </div>
            
           <div class="flex pb-3">
              <div class="flex items-center">
                <input type="radio" class="form-radio" name="gender" value="M" ${datum.data.gender === 'M' ? 'checked' : ''}>
                <label class="ml-2 text-gray-700">Male</label>
              </div>
              <div class="flex items-center ml-6">
                <input type="radio" class="form-radio" name="gender" value="F" ${datum.data.gender === 'F' ? 'checked' : ''}>
                <label class="ml-2 text-gray-700">Female</label>
              </div>
           </div>
          </div>
          <div class="grid gap-2">
          ${getEditFields(card_edit)}
          </div>
          ${(rel_type === "son" || rel_type === "daughter") ? otherParentSelect() : ''}
          <br><br>
          <div style="text-align: center">
            
            <button type="submit" class="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold py-2 px-4 rounded">
            Submit
          </button>
          

          </div>
        </form>
      </div>
    `)
    el.querySelector("form").addEventListener('submit', submitFormChanges)
    el.querySelector(".delete").addEventListener('click', deletePerson)
  }

  function otherParentSelect() {
    const data_stash = store.getData();
    return (`
      <div>
        <label>Select other</label>
        <select name="other_parent" style="display: block">
          ${(!rel_datum.rels.spouses || rel_datum.rels.spouses.length === 0) 
              ? '' 
              : rel_datum.rels.spouses.map((sp_id, i) => {
                  const spouse = data_stash.find(d => d.id === sp_id)
                  return (`<option value="${sp_id}" ${i === 0 ? 'selected' : ''}>${card_display[0](spouse)}</option>`)
                }).join("\n")}
          <option value="${'_new'}">NEW</option>
        </select>
      </div>
    `)
  }

  function submitFormChanges(e) {
   
    e.preventDefault()
    const form_data = new FormData(e.target)
    form_data.forEach((v, k) => datum.data[k] = v)
    close()
    postSubmit()
    
  }

  function deletePerson() {
    close()
    postSubmit({delete: true})
  }

  function getEditFields(card_edit) {
    return card_edit.map(d => (
      d.type === 'text'
        ? `<input type="text"
        name="${d.key}"
        placeholder="${d.placeholder}"
        value="${datum.data[d.key] || ''}"
         class="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Enter your text here">
        `
        // ? `<input type="text" name="${d.key}" placeholder="${d.placeholder}" value="${datum.data[d.key] || ''}">`
        : d.type === 'textarea'
        ? `<textarea class="materialize-textarea" name="${d.key}" placeholder="${d.placeholder}">${datum.data[d.key] || ''}</textarea>`
        : ''
    )).join('\n')
  }
}