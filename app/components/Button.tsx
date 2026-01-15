type ButtonProps = {
    children: React.ReactNode;
    type?: 'primary' | 'secondary' | 'primary-glow';
    className?: string;
    size?: 's' | 'm' | 'l';
    onClick?: () => void;
}

const Button = ({ children, type, className, size = "m", onClick }: ButtonProps) => {

  const buttonClasses = type === 'primary-glow'
    ? 'bg-primary-red border-primary-red border-2 text-primary-yellow font-black uppercase py-3 px-8 rounded-[50px] shadow-(--cta-shadow) hover:bg-background hover:text-primary-red hover:scale-105 duration-300'
    : 'bg-primary-yellow text-primary-red font-black uppercase py-3 px-8 rounded-[50px] ';
  const sizeClasses = size === 's'
    ? 'py-1 px-4 text-sm'
    : size === 'm'
    ? 'py-2 px-6 text-md'
    : 'py-3 px-8 text-xl';

  return (
    <button
      onClick={onClick}
      className={`${className} ${buttonClasses} ${sizeClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;