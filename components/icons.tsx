import type { JSX } from "react";

type IconProps = {
  className?: string;
};

type IconRenderer = (props?: IconProps) => JSX.Element;

const mergeClasses = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

export const icons = {
  chevron: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={mergeClasses("size-3 text-zinc-500", className)}
    >
      <path
        d="M3 4l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevronLight: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={mergeClasses("size-3 text-white", className)}
    >
      <path
        d="M3 4l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M10.875 18.75c4.349 0 7.875-3.5258 7.875-7.875S15.2242 3 10.875 3 3 6.5258 3 10.875s3.52576 7.875 7.875 7.875z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4434 16.4453L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  location: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M10 10.625c1.3808 0 2.5-1.1192 2.5-2.5 0-1.38071-1.1192-2.5-2.5-2.5s-2.5 1.11929-2.5 2.5c0 1.3808 1.1192 2.5 2.5 2.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 8.125C16.25 13.75 10 18.125 10 18.125S3.75 13.75 3.75 8.125c0-1.6576.65848-3.24732 1.83058-4.41942C6.75268 2.53348 8.34242 1.875 10 1.875s3.2473.65848 4.4194 1.83058C15.5915 4.87768 16.25 6.4674 16.25 8.125z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M12 15c3.3137 0 6-2.6863 6-6s-2.6863-6-6-6-6 2.68629-6 6 2.68629 6 6 6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.90625 20.2508c.9215-1.5964 2.24703-2.9221 3.84333-3.8438C8.34588 15.4853 10.1567 15 12 15s3.6541.4853 5.2504 1.407c1.5963.9217 2.9218 2.2474 3.8434 3.8438"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bag: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-6 text-current", className)}
      fill="none"
    >
      <path
        d="M16.3804 16.25H3.61947a.75.75 0 01-.61706-.5523L1.88119 6.32267a.75.75 0 01.86828-.69766h14.9875a.75.75 0 01.8683.69766l-1.1133 9.37503a.75.75 0 01-.6219.5523z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 5.625V5c0-.8288.32924-1.62366.91529-2.20971C8.37634 2.20424 9.1712 1.875 10 1.875c.8288 0 1.6237.32924 2.2097.91529C12.7958 3.37634 13.125 4.1712 13.125 5v.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  facebook: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("h-5 w-5 text-black", className)}
    >
      <path
        d="M9.1875 13.5223V21H13.2656V13.5223H16.3066L16.9395 10.084H13.2656V8.86758C13.2656 7.05 13.9793 6.35391 15.8215 6.35391C16.3945 6.35391 16.8551 6.36797 17.1223 6.39609V3.27773C16.6195 3.14062 15.3891 3 14.6789 3C10.9207 3 9.1875 4.77539 9.1875 8.60391V10.084H6.86719V13.5223H9.1875Z"
        fill="currentColor"
      />
    </svg>
  ),
  x: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("h-5 w-5 text-black", className)}
    >
      <path
        d="M3.04221 4L9.72655 12.9408L3 20.21H4.51388L10.403 13.8457L15.1612 20.21H20.313L13.2525 10.7663L19.5135 4H17.9997L12.5761 9.86141L8.19399 4H3.04221ZM5.26848 5.11552H7.63522L18.0863 19.0943H15.7196L5.26848 5.11552Z"
        fill="currentColor"
      />
    </svg>
  ),
  instagram: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("h-5 w-5 text-black", className)}
    >
      <path
        d="M11.7255 3C9.35597 3 9.0586 3.01036 8.12796 3.05271C7.19914 3.09525 6.56515 3.2423 6.0104 3.45806C5.43656 3.68091 4.9498 3.97902 4.46485 4.46416C3.97953 4.94913 3.68144 5.43591 3.45787 6.00958C3.24157 6.56453 3.09434 7.19872 3.05253 8.12721C3.01091 9.05788 3 9.35544 3 11.725C3 14.0946 3.01054 14.391 3.05271 15.3217C3.09543 16.2506 3.24248 16.8846 3.45805 17.4393C3.68107 18.0132 3.97917 18.5 4.4643 18.9849C4.94907 19.4703 5.43584 19.7691 6.00931 19.9919C6.56442 20.2077 7.1986 20.3548 8.12724 20.3973C9.05787 20.4396 9.35506 20.45 11.7244 20.45C14.094 20.45 14.3905 20.4396 15.3211 20.3973C16.25 20.3548 16.8847 20.2077 17.4398 19.9919C18.0135 19.7691 18.4995 19.4703 18.9843 18.9849C19.4696 18.5 19.7677 18.0132 19.9912 17.4395C20.2057 16.8846 20.353 16.2504 20.3966 15.3219C20.4384 14.3912 20.4493 14.0946 20.4493 11.725C20.4493 9.35544 20.4384 9.05806 20.3966 8.12739C20.353 7.19854 20.2057 6.56453 19.9912 6.00976C19.7677 5.43591 19.4696 4.94913 18.9843 4.46416C18.4989 3.97884 18.0136 3.68073 17.4393 3.45806C16.8831 3.2423 16.2487 3.09525 15.3199 3.05271C14.3892 3.01036 14.093 3 11.7227 3H11.7255ZM10.9428 4.57232C11.1751 4.57195 11.4343 4.57232 11.7255 4.57232C14.055 4.57232 14.3311 4.58068 15.251 4.62249C16.1016 4.66139 16.5633 4.80353 16.8709 4.92295C17.278 5.08109 17.5683 5.27014 17.8735 5.57551C18.1789 5.88089 18.3679 6.17172 18.5264 6.57889C18.6458 6.88608 18.7881 7.34778 18.8269 8.19846C18.8687 9.11822 18.8777 9.39452 18.8777 11.723C18.8777 14.0515 18.8687 14.3278 18.8269 15.2475C18.788 16.0982 18.6458 16.5599 18.5264 16.8671C18.3683 17.2743 18.1789 17.5642 17.8735 17.8694C17.5681 18.1748 17.2782 18.3638 16.8709 18.522C16.5637 18.6419 16.1016 18.7837 15.251 18.8226C14.3313 18.8644 14.055 18.8735 11.7255 18.8735C9.39578 18.8735 9.11968 18.8644 8.19994 18.8226C7.34928 18.7833 6.8876 18.6412 6.57987 18.5218C6.17271 18.3636 5.88189 18.1746 5.57652 17.8692C5.27116 17.5638 5.08212 17.2737 4.92362 16.8664C4.8042 16.5592 4.66188 16.0975 4.62316 15.2468C4.58136 14.3271 4.573 14.0508 4.573 11.7208C4.573 9.39088 4.58136 9.11604 4.62316 8.19628C4.66206 7.3456 4.8042 6.8839 4.92362 6.57634C5.08176 6.16917 5.27116 5.87834 5.57652 5.57297C5.88189 5.26759 6.17271 5.07855 6.57987 4.92005C6.88741 4.80008 7.34928 4.6583 8.19994 4.61921C9.0048 4.58286 9.31671 4.57195 10.9428 4.57014V4.57232ZM16.3827 6.02103C15.8046 6.02103 15.3357 6.48945 15.3357 7.06767C15.3357 7.6457 15.8046 8.11467 16.3827 8.11467C16.9607 8.11467 17.4296 7.6457 17.4296 7.06767C17.4296 6.48964 16.9607 6.02067 16.3827 6.02067V6.02103ZM11.7255 7.24435C9.25109 7.24435 7.24495 9.25055 7.24495 11.725C7.24495 14.1994 9.25109 16.2047 11.7255 16.2047C14.1998 16.2047 16.2053 14.1994 16.2053 11.725C16.2053 9.25055 14.1997 7.24435 11.7253 7.24435H11.7255ZM11.7255 8.81667C13.3315 8.81667 14.6337 10.1187 14.6337 11.725C14.6337 13.3311 13.3315 14.6333 11.7255 14.6333C10.1192 14.6333 8.81722 13.3311 8.81722 11.725C8.81722 10.1187 10.1192 8.81667 11.7255 8.81667Z"
        fill="currentColor"
      />
    </svg>
  ),
  tiktok: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("h-5 w-5 text-black", className)}
    >
      <path
        d="M10.2664 17.2589C11.6014 17.2589 12.6837 16.3032 12.6837 14.8417V4H15.5826C15.42 5.97723 17.3855 7.88718 19.5532 7.8435V10.5695C17.6994 10.5695 16.123 9.78561 15.5743 9.35059V14.8417C15.5743 17.2589 13.6728 20 10.2664 20C6.8601 20 5 17.2589 5 14.8417C5 11.43 8.61044 9.45136 11.0017 9.93497V12.7115C10.8814 12.669 10.5712 12.6061 10.3069 12.6061C8.96086 12.5564 7.8492 13.6482 7.8492 14.8417C7.8492 16.1767 8.93143 17.2589 10.2664 17.2589Z"
        fill="currentColor"
      />
    </svg>
  ),
  hamburger: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-6 text-current", className)}
      fill="none"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  close: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-6 text-current", className)}
      fill="none"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  sparkle: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={mergeClasses("size-3 text-current", className)}
    >
      <path
        d="M8 1.5l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5zm4 7l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8zm-8 0l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"
        fill="currentColor"
      />
    </svg>
  ),
  star: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-4 text-current", className)}
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  chevronLeft: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M15 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevronRight: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  smiley: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M10.5859 17.7998C14.7281 17.7998 18.0859 14.4419 18.0859 10.2998C18.0859 6.15767 14.7281 2.7998 10.5859 2.7998C6.4438 2.7998 3.08594 6.15767 3.08594 10.2998C3.08594 14.4419 6.4438 17.7998 10.5859 17.7998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.77344 9.6748C8.2912 9.6748 8.71094 9.25507 8.71094 8.7373C8.71094 8.21954 8.2912 7.7998 7.77344 7.7998C7.25567 7.7998 6.83594 8.21954 6.83594 8.7373C6.83594 9.25507 7.25567 9.6748 7.77344 9.6748Z"
        fill="currentColor"
      />
      <path
        d="M13.3984 9.6748C13.9162 9.6748 14.3359 9.25507 14.3359 8.7373C14.3359 8.21954 13.9162 7.7998 13.3984 7.7998C12.8807 7.7998 12.4609 8.21954 12.4609 8.7373C12.4609 9.25507 12.8807 9.6748 13.3984 9.6748Z"
        fill="currentColor"
      />
      <path
        d="M13.7109 12.1748C13.0625 13.2959 11.9742 14.0498 10.5859 14.0498C9.19766 14.0498 8.10938 13.2959 7.46094 12.1748"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  stool: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M14.9609 2.7998H6.21094C5.86576 2.7998 5.58594 3.07963 5.58594 3.4248V5.2998C5.58594 5.64498 5.86576 5.9248 6.21094 5.9248H14.9609C15.3061 5.9248 15.5859 5.64498 15.5859 5.2998V3.4248C15.5859 3.07963 15.3061 2.7998 14.9609 2.7998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7109 5.9248L15.5859 17.7998"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.58594 17.7998L7.46094 5.9248"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.27734 13.4248H14.8961"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chat: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M10 10.3125C10.5178 10.3125 10.9375 9.89277 10.9375 9.375C10.9375 8.85723 10.5178 8.4375 10 8.4375C9.48223 8.4375 9.0625 8.85723 9.0625 9.375C9.0625 9.89277 9.48223 10.3125 10 10.3125Z"
        fill="currentColor"
      />
      <path
        d="M6.5625 10.3125C7.08027 10.3125 7.5 9.89277 7.5 9.375C7.5 8.85723 7.08027 8.4375 6.5625 8.4375C6.04473 8.4375 5.625 8.85723 5.625 9.375C5.625 9.89277 6.04473 10.3125 6.5625 10.3125Z"
        fill="currentColor"
      />
      <path
        d="M13.4375 10.3125C13.9553 10.3125 14.375 9.89277 14.375 9.375C14.375 8.85723 13.9553 8.4375 13.4375 8.4375C12.9197 8.4375 12.5 8.85723 12.5 9.375C12.5 9.89277 12.9197 10.3125 13.4375 10.3125Z"
        fill="currentColor"
      />
      <path
        d="M8.20859 15L9.45859 17.1875C9.51322 17.2833 9.59222 17.363 9.68758 17.4184C9.78294 17.4738 9.89127 17.503 10.0016 17.503C10.1119 17.503 10.2202 17.4738 10.3155 17.4184C10.4109 17.363 10.4899 17.2833 10.5445 17.1875L11.7945 15H16.875C17.0408 15 17.1997 14.9342 17.3169 14.8169C17.4342 14.6997 17.5 14.5408 17.5 14.375V4.375C17.5 4.20924 17.4342 4.05027 17.3169 3.93306C17.1997 3.81585 17.0408 3.75 16.875 3.75H3.125C2.95924 3.75 2.80027 3.81585 2.68306 3.93306C2.56585 4.05027 2.5 4.20924 2.5 4.375V14.375C2.5 14.5408 2.56585 14.6997 2.68306 14.8169C2.80027 14.9342 2.95924 15 3.125 15H8.20859Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  phone: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M12.843 11.3544C12.9295 11.2968 13.0291 11.2617 13.1326 11.2523C13.2362 11.2429 13.3404 11.2594 13.4359 11.3005L17.1203 12.9512C17.2445 13.0043 17.3481 13.0962 17.4157 13.2131C17.4833 13.3299 17.5112 13.4656 17.4953 13.5997C17.3739 14.5067 16.9273 15.3389 16.2383 15.9413C15.5494 16.5437 14.6652 16.8754 13.75 16.8747C10.9321 16.8747 8.22957 15.7553 6.23699 13.7627C4.24442 11.7701 3.125 9.0676 3.125 6.24968C3.1243 5.33452 3.456 4.45026 4.05841 3.76134C4.66082 3.07242 5.49293 2.62574 6.4 2.50436C6.53409 2.48844 6.66973 2.51636 6.78662 2.58396C6.90351 2.65156 6.99537 2.7552 7.04844 2.87936L8.69922 6.56686C8.73978 6.66157 8.7563 6.76484 8.7473 6.86748C8.7383 6.97012 8.70407 7.06894 8.64766 7.15515L6.97813 9.1403C6.9189 9.22966 6.88388 9.33286 6.87649 9.43981C6.86909 9.54676 6.88958 9.6538 6.93594 9.75046C7.58203 11.0731 8.94922 12.4239 10.2758 13.0637C10.373 13.1099 10.4805 13.1299 10.5878 13.1218C10.695 13.1138 10.7983 13.0778 10.8875 13.0176L12.843 11.3544Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  paperPlane: ({ className }: IconProps = {}) => (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={mergeClasses("size-5 text-current", className)}
      fill="none"
    >
      <path
        d="M10 9.42969V14.4297"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10.0006 14.3746L17.2881 16.8363C17.4081 16.8802 17.5387 16.8863 17.6623 16.8537C17.7859 16.8212 17.8965 16.7515 17.9793 16.6541C18.0621 16.5567 18.113 16.4362 18.1251 16.309C18.1373 16.1818 18.1102 16.0539 18.0475 15.9425L10.5405 2.81754C10.4864 2.71985 10.4072 2.63842 10.311 2.58172C10.2148 2.52502 10.1052 2.49512 9.99358 2.49512C9.88194 2.49512 9.77233 2.52502 9.67616 2.58172C9.57998 2.63842 9.50076 2.71985 9.44671 2.81754L1.95843 15.9425C1.89634 16.0536 1.8696 16.1809 1.88178 16.3075C1.89396 16.4341 1.94448 16.554 2.02658 16.6511C2.10869 16.7482 2.21849 16.818 2.3413 16.8511C2.46411 16.8842 2.5941 16.879 2.71389 16.8363L10.0006 14.3746Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
} as const satisfies Record<string, IconRenderer>;

export type IconName = keyof typeof icons;
