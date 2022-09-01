import AssignmentList from "./AssignmentList.js"
import AssignmentCreate from "./AssignmentCreate.js"

export default {
    components: { AssignmentList, AssignmentCreate },

    template: `
        <section class="flex gap-8">
            <assignment-list :assignments="filters.inProgress" title="In Progress">
                <assignment-create @add="add"></assignment-create>
            </assignment-list>

            <assignment-list :assignments="filters.completed" title="Completed" can-hide></assignment-list>
        </section>
    `,

    data() {
        return {
            assignments: [],
        }
    },

    computed: {
        filters () {
            return {
                inProgress: this.assignments.filter(assignment => ! assignment.complete),
                completed: this.assignments.filter(assignment => assignment.complete)
            }
        }
    },

    created() {
        fetch('http://localhost:3001/assignments')
            .then(response => response.json())
            .then(assignments => {
                this.assignments = assignments;
            });
    },

    methods: {
        add (name) {
            this.assignments.push({
                name: name,
                completed: false,
                id: this.assignments.length + 1
            });
        }
    }
}