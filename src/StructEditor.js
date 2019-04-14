var StructEditor = (function(){

    let instances = {};

    class StructEditor{
        constructor(pElement, pOptions){
            this.type = "json";
            this.editable = {
                values:true,
                props:true,
                struct:false
            };
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

            this.value = JSON.parse(this.element.value)||{};
            this.container.innerHTML += render(this.value, this.editable, "");
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
            let span = e.currentTarget;
            let isValue = span.classList.contains('value');
            let value = span.innerHTML;
            let prop = span.getAttribute("data-prop");
            let props = prop.split(".");
            let data = this.value;
            while(props.length){
                let i = props.shift();
                if(!data.hasOwnProperty(i)) {
                    console.warn("StructEditor.contentEditableBlueHandler -  no prop "+i);
                    return;
                }
                if(!props.length){
                    if(isValue){
                        data[i] = value;
                    }else{
                        data[value] = data[i];
                        delete data[i];
                    }
                }else{
                    data = data[i];
                }
            }

            this.element.setAttribute("value", JSON.stringify(this.value));
        }
    }

    function init(){
        document.querySelectorAll('input[data-role="StructEditor"]').forEach(function(pEl){
            instances[pEl] = new StructEditor(pEl, JSON.parse(pEl.getAttribute("data-options")||'{}'));
        });
    }

    window.addEventListener('DOMContentLoaded', init, false);

    function render(pValue, pEditable, pProp){
        let editable;
        let prop = pProp;
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
                editable = pEditable.props?' contenteditable="true"':"";
                prop = pProp !== "" ? pProp+"."+i:i;
                props += "<li"+(typeof pValue[i] === "object"?" class='folded'":"")+"><span data-prop='"+prop+"' class='"+t+" label'"+editable+">"+i+"</span>:"+render(pValue[i], pEditable, prop)+"</li>";
            }
            let preview = pProp!=""?"<span class='"+type+" preview'>"+value+"</span>":"";
            return preview+"<ul>"+props+"</ul>";
        }
        editable = pEditable.values?' contenteditable="true"':"";
        return "<span data-prop='"+prop+"' class='"+(typeof pValue)+" value'"+editable+">"+pValue+"</span>";
    }

    return {
        getInstance:function(pSelector){
            return instances[document.querySelector(pSelector)];
        }
    };

})();