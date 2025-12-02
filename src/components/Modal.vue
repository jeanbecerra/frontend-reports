<template>
    <transition name="fade">
        <div v-if="show" class="fixed bottom-5 right-5 z-50">
            <div :class="type === 'success'
                ? 'bg-green-500'
                : 'bg-red-500'" class="text-white px-6 py-4 rounded-xl shadow-lg text-lg font-semibold">
                {{ message }}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "BaseModal",
    props: {
        show: { type: Boolean, default: false },
        message: { type: String, default: "" },
        type: { type: String, default: "success" } // success | error
    }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
