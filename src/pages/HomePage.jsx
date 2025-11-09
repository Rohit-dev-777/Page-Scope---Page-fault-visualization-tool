import { Link } from 'react-router-dom';
import { 
    Cpu, 
    Play, 
    BarChart3, 
    Zap, 
    BookOpen, 
    TrendingUp, 
    Eye, 
    Code,
    ArrowRight,
    CheckCircle2,
    Clock,
    Layers,
    Target
} from 'lucide-react';
import { ALGORITHM_CONFIG } from '../data/algorithmData';

const HomePage = () => {
    const algorithms = Object.keys(ALGORITHM_CONFIG);
    const features = [
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Real-Time Visualization",
            description: "Watch page faults happen in real-time with dynamic frame replacement animations"
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Performance Metrics",
            description: "Analyze hit rates, fault counts, and algorithm efficiency with detailed charts"
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "Multiple Algorithms",
            description: "Compare FIFO, LRU, Optimal, and Second Chance algorithms side-by-side"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Interactive Learning",
            description: "Step through each algorithm execution with detailed explanations"
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "AI-Powered Explanations",
            description: "Get intelligent insights and explanations for algorithm decisions"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Export & Analyze",
            description: "Export simulation results and charts for further analysis"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                            <Cpu className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Page Replacement
                        <span className="block text-blue-600 dark:text-blue-400 mt-2">
                            Algorithm Visualizer
                        </span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the art of memory management through interactive, step-by-step visualizations 
                        of page replacement algorithms. Understand how operating systems handle page faults 
                        in real-time.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/simulation"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl hover:scale-105"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Start Simulation
                        </Link>
                        <a
                            href="#learn-more"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                            Learn More
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* What is Page Replacement Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mx-4 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        What is Page Replacement?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Page replacement is a crucial memory management technique used by operating systems 
                        to decide which memory pages to swap out when physical memory is full.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Memory Frames
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Physical memory is divided into frames that hold pages from virtual memory.
                        </p>
                    </div>
                    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Page Faults
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            When a required page isn't in memory, a page fault occurs and a replacement decision is made.
                        </p>
                    </div>
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Optimal Strategy
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Different algorithms use various strategies to minimize page faults and improve performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="learn-more" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Key Features
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Everything you need to understand page replacement algorithms
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Algorithms Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl mx-4 mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Supported Algorithms
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Explore different page replacement strategies
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {algorithms.map((algo) => {
                        const config = ALGORITHM_CONFIG[algo];
                        return (
                            <div
                                key={algo}
                                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {config.name}
                                    </h3>
                                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                        {config.complexityBadge}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {config.description}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {config.timeComplexity}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Get started in three simple steps
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Choose Algorithm
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Select from FIFO, LRU, Optimal, or Second Chance algorithm
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Set Parameters
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Enter your reference string and number of frames
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Visualize & Learn
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Watch the algorithm execute step-by-step with real-time animations
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center shadow-2xl">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Explore?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Start visualizing page replacement algorithms and understand memory management like never before
                    </p>
                    <Link
                        to="/simulation"
                        className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-blue-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    >
                        <Play className="w-5 h-5 mr-2" />
                        Launch Simulation
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Use This Tool?
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        "Interactive step-by-step execution",
                        "Real-time frame replacement visualization",
                        "Performance metrics and analytics",
                        "Multiple algorithm comparison",
                        "AI-powered explanations",
                        "Export results for analysis",
                        "Educational and intuitive interface",
                        "Perfect for students and professionals"
                    ].map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                {benefit}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;