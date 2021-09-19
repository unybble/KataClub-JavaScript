<template>
	<div class="task-new">
		<div class="task-new__field">
			<input
				v-model="taskNew.name"
				@keyup.enter="createTaskNew()"
				class="task-new__input"
				type="text"
				placeholder="New task"
				autofocus
			/>
			<Button
				class="task-new__button-add button--icon"
				@button-click="createTaskNew()"
			>
				<span class="button__icon">
					<i class="icon">
						<FontAwesomeIcon icon="plus-circle" />
					</i>
				</span>
			</Button>
		</div>
	</div>
</template>


<script>
	const Logger = require('../logger')

	const logger = new Logger().getLoggerInstance();

	import {StrategyManager, Urgent, Normal, Trivial} from './StrategyManager'

	import { mapGetters, mapActions } from 'vuex';
	import Button from '@/components/UI/Button.vue'

	export default {
		name: 'TaskNew',
		components: {
			Button
		},
		data() {
			return {
				taskNew: {
					name: ''
				}
			};
		},
		computed: {
			...mapGetters(['getTaskLast']),
			createTaskId() {
				return this.getTaskLast.id + 1;
			},
			createTaskName() {
				return this.taskNew.name.trim()
			}
		},
		methods: {
			...mapActions([
				'addTask'
			]),
			cleanTaskNew() {
				this.taskNew.name = "";
			},
			createTaskNew() {
				const strategyManager = new StrategyManager();
				const urgent = new Urgent();
				const normal = new Normal();
				const trivial = new Trivial();

				const taskId = this.createTaskId;
				const taskName = this.createTaskName;

				if(taskName.toLowerCase().includes("urgent")){
					strategyManager.strategy = urgent;
					
				}else if(taskName.toLowerCase().includes("meh")){
					strategyManager.strategy = trivial;
				}
				else{
					strategyManager.strategy = normal;
				}

				strategyManager.classify();

				const task = {
					id: taskId,
					name: taskName
				};

				if (taskName != "") {
					this.addTask(task);
				}

				this.cleanTaskNew();
				this.emitAddTask()
				logger.logItem(task)
			},
			emitAddTask() {
				this.$emit('add-task');
			}
		}
	};
</script>


<style lang="scss" scoped>
	.task-new {
		padding: 1.5rem 2rem;
		background-color: $color-ghost;

		&__field {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 5rem;
			border: 0.3rem solid $color-brand-3;
			background-color: $color-white;
			overflow: hidden;
		}

		&__input {
			border: none;
			outline: none;
			padding: 1.2rem 1.6rem;
			flex: 1;
			font-family: $font-brand-2;
			font-size: 1.6rem;
			font-weight: 600;
			color: $color-brand-3;

			&::placeholder {
				font-weight: 400;
				color: $color-gray;
			}
		}

		&__button-add {
			width: 5rem;
			height: 5rem;
			color: $color-brand-3;
			font-size: 3.6rem;

			&:hover {
				color: mix($color-black, $color-brand-3, 20%);
			}
		}
	}
</style>
