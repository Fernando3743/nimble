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
      className={mergeClasses("h-5 w-5 text-white", className)}
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
      className={mergeClasses("h-5 w-5 text-white", className)}
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
      className={mergeClasses("h-5 w-5 text-white", className)}
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
      className={mergeClasses("h-5 w-5 text-white", className)}
    >
      <path
        d="M10.2664 17.2589C11.6014 17.2589 12.6837 16.3032 12.6837 14.8417V4H15.5826C15.42 5.97723 17.3855 7.88718 19.5532 7.8435V10.5695C17.6994 10.5695 16.123 9.78561 15.5743 9.35059V14.8417C15.5743 17.2589 13.6728 20 10.2664 20C6.8601 20 5 17.2589 5 14.8417C5 11.43 8.61044 9.45136 11.0017 9.93497V12.7115C10.8814 12.669 10.5712 12.6061 10.3069 12.6061C8.96086 12.5564 7.8492 13.6482 7.8492 14.8417C7.8492 16.1767 8.93143 17.2589 10.2664 17.2589Z"
        fill="currentColor"
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
} as const satisfies Record<string, IconRenderer>;

export type IconName = keyof typeof icons;
