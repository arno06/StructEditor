var StructEditor = (function(){

    let instances = {};

    class StructEditor{
        constructor(pElement, pOptions){
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

            let v = JSON.parse(this.element.value)||{};
            this.container.innerHTML += render(v, true);
            this.container.querySelectorAll("li.folded>span.label,li.folded>span.preview").forEach(function(pEl){
                pEl.addEventListener('click', StructEditor.toggleStructHandler, false);
            });
            let ref = this;
            this.container.querySelectorAll('span[contenteditable="true"]').forEach(function(pEl){
                pEl.addEventListener('blur', ref.contentEditableBlueHandler.bind(ref), false);
            });
        }

        static toggleStructHandler(e){
            var li = e.currentTarget.parentNode;
            li.classList.toggle("folded");
            li.classList.toggle("unfolded");
        }

        contentEditableBlueHandler(e){
            console.log(e.currentTarget.innerHTML);
        }
    }

    function init(){
        document.querySelectorAll('input[data-role="StructEditor"]').forEach(function(pEl){
            instances[pEl] = new StructEditor(pEl);
        });
    }

    window.addEventListener('DOMContentLoaded', init, false);

    function render(pValue, pContentEditable, pDisplayPreview){
        if (typeof pValue === "object"){
            let type = typeof pValue;
            let value = "{...}";
            if(Array.isArray(pValue)){
                type = "array";
                value = "[...]";
            }
            let props = "";
            for(var i in pValue){
                if(!pValue.hasOwnProperty(i)){
                    continue;
                }
                let t = typeof i;
                props += "<li"+(typeof pValue[i] === "object"?" class='folded'":"")+"><span class='"+t+" label'>"+i+"</span>:"+render(pValue[i], pContentEditable, true)+"</li>";
            }
            let preview = pDisplayPreview?"<span class='"+type+" preview'>"+value+"</span>":"";
            return preview+"<ul>"+props+"</ul>";
        }
        let editable = pContentEditable?' contenteditable="true"':"";
        return "<span class='"+(typeof pValue)+" value'"+editable+">"+pValue+"</span>";
    }

    return {
        getInstance:function(pSelector){
            return instances[document.querySelector(pSelector)];
        }
    };

})();