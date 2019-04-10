var StructEditor = (function(){

    var instances = {};

    function StructEditor(pElement, pOptions){
        this.type = "json";
        for(var i in pOptions){
            if(!pOptions.hasOwnProperty(i)||!this.hasOwnProperty(i)){
                continue;
            }
            this[i] = pOptions[i];
        }
        pElement.setAttribute("type","hidden");
        this.element = pElement;
        this.container = document.createElement("div");
        this.container.classList.add("structeditor-container");
        if(this.element.nextSibling){
            this.element.parentNode.insertBefore(this.container, this.element.nextSibling);
        }else{
            this.element.parentNode.appendChild(this.container);
        }

        var t = new Template('StructEditor_tpl');
        t.render(this.container);
    }

    Class.define(StructEditor, [EventDispatcher], {

    });

    function init(){
        document.querySelectorAll('input[data-role="StructEditor"]').forEach(function(pEl){
            instances[pEl] = new StructEditor(pEl);
        });
    }

    window.addEventListener('DOMContentLoaded', init, false);

    Template.$["StructEditor_tpl"] = `
<ul>
    <li><span class="string_label">String</span>:<span class="string_value">bar</span></li>
    <li><span class="string_label">Foo</span>:<span class="numeric_value">123456879</span></li>
    <li><span class="string_label">some_object</span>:<span class="object_preview">{...}</span></li>
    <li><span class="string_label">Foo</span>:<span class="array_preview">[...]</span></li>
</ul>
`;

    return {
        getInstance:function(pSelector){
            return instances[document.querySelector(pSelector)];
        }
    };

})();