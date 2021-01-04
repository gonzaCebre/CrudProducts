(()=>{"use strict";var e=["second","minute","hour","day","week","month","year"],t=["秒","分钟","小时","天","周","个月","年"],n={},r=function(e,t){n[e]=t},d=[60,60,24,7,365/7/12,12];function a(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}r("en_US",(function(t,n){if(0===n)return["just now","right now"];var r=e[Math.floor(n/2)];return t>1&&(r+="s"),[t+" "+r+" ago","in "+t+" "+r]})),r("zh_CN",(function(e,n){if(0===n)return["刚刚","片刻后"];var r=t[~~(n/2)];return[e+" "+r+"前",e+" "+r+"后"]}));const c=new class{constructor(){this.URI="http://localhost:3000/api/products"}async getProducts(){const e=await fetch(this.URI);return await e.json()}async postProduct(e){const t=await fetch(this.URI,{method:"POST",body:e});await t.json()}async deleteProduct(e){const t=await fetch(`${this.URI}/${e}`,{headers:{"Content-Type":"aplication/json"},method:"DELETE"});await t.json()}},o=class{async renderProducts(){const e=await c.getProducts(),t=document.getElementById("products-cards");t.innerHTML="",e.forEach((e=>{const r=document.createElement("div");var c,o,s;r.className="",r.innerHTML=`\n                <div class="card m-2">\n                    <div class="row no-gutters">\n                        <div class="col-md-4">\n                            <img src="http://localhost:3000${e.imagePath}" class="img-fluid" alt="">\n                        </div>\n                        <div class="col-md-8">\n                            <div class="card-block px-2">\n                                <h4 class="card-title">${e.title}</h4>\n                                <p class="card-text">${e.price}</p>\n                                <a href="#" class="btn btn-danger delete" _id="${e._id}">X</a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="card-footer w-100 text-muted">\n                        ${c=e.created_at,function(e,t){for(var n=e<0?1:0,r=e=Math.abs(e),a=0;e>=d[a]&&a<d.length;a++)e/=d[a];return(e=Math.floor(e))>(0==(a*=2)?9:1)&&(a+=1),t(e,a,r)[n].replace("%s",e.toString())}(function(e,t){return(+(t?a(t):new Date)-+a(e))/1e3}(c,s&&s.relativeDate),function(e){return n[e]||n.en_US}(o))}\n                    </div>\n                </div>\n            `,t.appendChild(r)}))}async addANewProduct(e){await c.postProduct(e),this.clearProductForm(),this.renderProducts()}clearProductForm(){document.getElementById("product-form").reset()}renderMessage(e,t,n){const r=document.createElement("div");r.className=`alert alert-${t} message`,r.appendChild(document.createTextNode(e));const d=document.querySelector(".col-md-4"),a=document.querySelector("#product-form");d.insertBefore(r,a),setTimeout((()=>{document.querySelector(".message").remove()}),n)}async deleteProduct(e){await c.deleteProduct(e),this.renderProducts()}};document.addEventListener("DOMContentLoaded",(()=>{(new o).renderProducts()})),document.getElementById("product-form").addEventListener("submit",(e=>{const t=document.getElementById("title").value,n=document.getElementById("price").value,r=document.getElementById("description").value,d=document.getElementById("image").files,a=new FormData;a.append("image",d[0]),a.append("title",t),a.append("price",n),a.append("description",r);const c=new o;c.addANewProduct(a),c.renderMessage("New Product Added","success",3e3),e.preventDefault()})),document.getElementById("products-cards").addEventListener("click",(e=>{if(e.target.classList.contains("delete")){const t=new o;t.deleteProduct(e.target.getAttribute("_id")),t.renderMessage("Product removed","danger",2e3)}e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map