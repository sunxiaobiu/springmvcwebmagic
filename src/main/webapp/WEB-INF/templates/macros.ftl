<#macro pager cur, total, url>
<div class="row">
    <div class = "col-md-12">
        <div class="text-right">
            <div class="btn-group button-group">
                <#assign pageShow = 3>
				<#assign left = false>
				<#assign right = false>
                <#if total gt 1>
                    <#if cur lte 1>
                        <a href="${url}&page=1" class="btn btn-default" disabled>1</a>
                    <#else>
                        <a href="${url}&page=${cur-1}" class="btn btn-default">上一页</a>
                        <a href="${url}&page=1" class="btn btn-default">1</a>
                    </#if>
                    <#if total lte 2*pageShow+3>
                        <#assign max = total-1>
                        <#assign min = 2>
                    <#elseif cur+1 lte pageShow+2>
                        <#assign max = cur+1+pageShow>
                        <#assign min = 2>
                        <#assign right = true>
                    <#elseif cur+1 gte total-pageShow-1>
                        <#assign max = total-1>
                        <#assign min = cur+1-pageShow>
                        <#assign left = true>
                    <#else>
                        <#assign max = cur+pageShow+1>
                        <#assign min = cur-pageShow+1>
                        <#assign left = true>
                        <#assign right = true>
                    </#if>
                    <#if left == true>
                        <div class="btn" disabled="">...</div>
                    </#if>
                    <#if max gte min>
                        <#list min..max as i>
                            <#if cur == i>
                                <a href="${url}&&page=${i}" class="btn btn-default" disabled>${i}</a>
                            <#else>
                                <a href="${url}&&page=${i}" class="btn btn-default">${i}</a>
                            </#if>
                        </#list>
                    </#if>
                    <#if right == true>
                        <div class="btn" disabled="">...</div>
                    </#if>
                    <#if cur == total>
                        <a href="${url}&page=${total}" class="btn btn-default" disabled>${total}</a>
                    <#else>
                        <a href="${url}&page=${total}" class="btn btn-default">${total}</a>
                        <a href="${url}&page=${cur+1}" class="btn btn-default">下一页</a>
                    </#if>
                </#if>
            </div>
        </div>
    </div>
</div>
</#macro>

<#macro cell item>
    <#if item.type == 'button'>
        <#if item.enable >
            <button type="button" class="btn btn-default ${item.cssClass}"
                <#if !item.enable> disabled </#if>
                <#list item.attributes?keys as k>
                    data-${k}="${item.attributes[k]}"
                </#list>>${item.value}
            </button>
        </#if>
    <#elseif item.type == 'text'>
            ${item.value}
    <#elseif item.type == 'link'>
        <a herf="${item.attributes['href']}">${item.value}</a>
    <#elseif item.type == 'checkbox'>
        <input type="checkbox" class="${item.cssClass}"
            <#list item.attributes?keys as k>
			   data-${k}="${item.attributes[k]}"
            </#list>>
    </#if>
</#macro>




<#macro optional item default = '-'><@compress single_line=true>
    <#if item.present >
        ${item.get()}
    <#else>
        ${default}
    </#if>
</@compress></#macro>

<#macro guaranteePrompt item>
    <#if item.present >
        <#if item.get() == "待上传保底协议附件">
            <p> ——请到App端上传保底协议附件</p>
        </#if>
    </#if>
</#macro>
