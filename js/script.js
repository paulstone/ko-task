const taskClassTagMapping = {
    'act': {
        'class': 'activity',
        'displayText': 'Activity'
    },
    'exm': {
        'class': 'assessment',
        'displayText': 'Assessed'
    },
    'grp': {
        'class': 'group',
        'displayText': 'Collaborative'
    },
    'med': {
        'class': 'media',
        'displayText': 'Media'
    }
}

window.addEventListener('DOMContentLoaded', addTaskTags, false);

function addTaskTags() {

    // Get all "task-activity" elements within the div with the class of "task-container"   
    var taskActivities = document.querySelectorAll('.task-container .task-activity');
    
    // Loop through each "task-activity" elements and create the task tags
    taskActivities.forEach(function(taskActivity) {
        
        // Get the task type from the "task-activity__name" elements other classes
        // NOTE: relies on the task type class always being the second class in the 'class' attribute.
        // Would prefer to use a data attribute, e.g. data-task-type="exm-grp-med"
        let taskTypes = taskActivity.querySelector('.task-activity__name').className.split(' ')[1];

        // split taskTypes into an array
        taskTypes = taskTypes.split('-');

        // Loop through each task type and create the task tag by looking it up in the taskClassTagMapping object
        taskTypes.forEach(function(taskType) {
            // only create the tag if it is in the taskClassTagMapping object
            const taskTag = taskClassTagMapping[taskType];
            if (taskTag) {
                taskActivity.querySelector('.task-activity__tags').appendChild(createTaskTag(taskTag));
            }
        });

    });

}

function createTaskTag(tag) {
    let taskTag = document.createElement('div');
    taskTag.className = 'tag--' + tag.class;
    taskTag.innerHTML = tag.displayText;
    taskTag.addEventListener('click', triggerDemoLink, false);
    return taskTag;
}

function triggerDemoLink() {
    alert('This could trigger a search to filter only tasks with the same tag, or link to an explanation page');
}