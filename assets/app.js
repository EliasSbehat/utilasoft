function renderChart() {
    const options = {
        series: [
            {
                name: "Discussions",
                data: [736, 54, 34, 154, 428, 853, 275, 187, 256, 181, 553, 46]
            },
            {
                name: "Sales",
                data: [373, 348, 576, 769, 728, 419, 612, 490, 617, 132, 424, 608]
            },
            {
                name: "Cash ($)",
                data: [427, 104, 151, 688, 76, 298, 702, 476, 725, 646, 439, 757]
            },
        ],
        colors: ['#3DD598', '#4B84E9', '#FC5A5A'],
        title: {
            text: "Performance",
            style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#252849',
            },
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
            fontSize: '18px',
            offsetY: -45,
            itemMargin: {
                horizontal: 19,
            },
        },
        chart: {
            width: '100%',
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            },
            parentHeightOffset: 0,
        },
        grid: {
            show: true,
            borderColor: '#F1F1F5',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
            row: {
                colors: undefined,
                opacity: 0.5
            },
            column: {
                colors: undefined,
                opacity: 0.5
            },
            padding: {
                top: 0,
                right: 30,
                bottom: 0,
                left: 30
            },
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', ' Nov', 'Dec'],
            labels: {
                style: {
                    fontSize: '14px',
                    colors: ['#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D', '#92929D']
                }
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '14px',
                    cssClass: 'apexcharts-yaxis-title',
                }
            },
        },
    };
    const chart = new ApexCharts(document.querySelector("#performanceChart"), options);
    chart.render();
}

function dragQuestions() {
    $("#availableQuestions").sortable({
        connectWith: "#displayQuestions",
        helper: "clone",
        start: function (e, ui) {
            const nodes = Array.prototype.slice.call($('#availableQuestions')[0].children)
            item = ui.item[0]
            index = nodes.indexOf(item)
            console.log(index)
        },
        remove: function (e, ui) {
            const cloneItem = ui.item.clone();
            if (index) {
                cloneItem.insertAfter($('#availableQuestions > div').eq(index - 1));
            } else {
                cloneItem.prependTo($('#availableQuestions'))
            }
        }
    });
    $("#displayQuestions").sortable();
}

$(document).on('click', '#displayQuestions .custom-icon-wrong', function () {
    const $this = $(this);
    Swal.fire({
        title: "Confirm?",
        text: "Are you sure you want to process this request?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        reverseButtons: true,
        customClass: {
            confirmButton: "bg-danger border-danger",
        },
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $this.parent().remove();
        }
    });
})

function initChat() {
    $('#chatContent').on('keydown', function (e) {
        const code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            sentChat();
        }
    })
    $('#sendChatBtn').click(function () {
        sentChat();
    })
}

function sentChat() {
    $chatContent = $('#chatContent');
    const content = $chatContent.val();
    $(`<div class="d-flex justify-content-end align-items-start my-3">
         <div class="rounded-1 bg-secondary3 p-3 me-2 w-500">
             <div class="p-1 text-black lh-lg position-relative">
                 ${content}
                 <span class="position-absolute bottom-0 end-0 text-secondary2 text-14">3:32 pm</span>
             </div>
         </div>
         <img src="./../assets/images/discussion-user1.png" alt="">
    </div>`).insertBefore('.chat-replies');
    $chatContent.val("");
}

function initTaskTable() {
    $('#taskTable tr.parent-row').click(function () {
        const id = $(this).data('id');
        $(this).find('.custom-icon-chevron-down1').toggleClass('open')
        $(`#taskTable tr[data-parent-id="${id}"]`).toggle();
    })
}

function initContracts() {
    $('#viewProjectContract').click(function () {
        $(`.contracts`).show();
        $('#upworkContract').hide();
    })
    $('.view-contract').click(function () {
        $(`.contracts`).hide();
        $('#upworkContract').show();
    })
}

function initAlerts() {
    $('.app-alert i.custom-icon-wrong').click(function () {
        $(this).closest('.app-alert').remove();
    })
}

initAlerts();

function addTaskRow() {
    $('.add-task-row').on('keydown', function (e) {
        const code = (e.keyCode ? e.keyCode : e.which);
        if (code !== 13) return;
        $taskRow = $(this).closest('tr');
        const taskContent = $(this).val();
        if (!taskContent) return;
        const parentId = $taskRow.data('parent-id');
        $(`<tr data-parent-id="${parentId}">
            <td>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary border-0 p-0 me-2 ms-${parentId === 1 ? "5" : "4"} rounded-circle">
                         <i class="custom-icon-task-checked d-block"></i>
                    </button>
                   <div class="text-14 me-4 flex-1">${taskContent}</div>
                </div>
                </td>
            <td></td>
            </tr>`).insertBefore($taskRow);
        $(this).val("");
    })
}

function addComment() {
    $('#addComment').click(function () {
        $commentTextarea = $('#commentTextarea');
        const content = $commentTextarea.val();
        if (!content) return;
        $(`
            <div class="d-flex align-items-center">
                <div class="bg-3256BC rounded-circle border border-white d-flex justify-content-center align-items-center text-white fw-medium wh-36 me-2">
                    CA
                </div>
                <div class="fw-bold">Chris Abbott&nbsp;</div>
                <div class="me-2">${content}</div>
            </div>
            <div class="mt-3 pt-1"></div>
            `).appendTo($('#collapseComments'));
        $commentTextarea.val("");
    })
}