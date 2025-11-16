import type { Dictionary } from "./en";

export const es: Dictionary = {
  // Navegación
  nav: {
    helpCenter: "Centro de Ayuda",
    findStore: "Encuentra una Tienda",
    contact: "Contacto",
    shopByCategories: "Comprar por Categorías",
    shopByRoom: "Comprar por Habitación",
    tablesDesks: "Mesas y Escritorios",
    chairsStools: "Sillas y Taburetes",
    pages: "Páginas",
    themeFeatures: "Características del Tema",
    onSale: "En Oferta",
    allCategories: "Todas las Categorías",
    all: "Todo",
    searchPlaceholder: "¿Qué estás buscando?",
    signInRegister: "Iniciar sesión / Registrarse",
    bag: "Bolsa",
    myProfile: "Mi Perfil",
    unitedStates: "Estados Unidos (USD $)",
    freeShipping: "¡Envío Express Gratis en pedidos de $500!",
  },

  // Auth - Iniciar Sesión
  signIn: {
    title: "Bienvenido de Nuevo",
    subtitle: "Inicia sesión en tu cuenta de Nimble",
    heroTitle: "Bienvenido de nuevo a tu paraíso de muebles",
    heroSubtitle: "Inicia sesión para acceder a tus artículos guardados, rastrear pedidos y descubrir nuevas piezas de mobiliario para tu hogar.",
    continueWithGoogle: "Continuar con Google",
    orSignInWith: "O inicia sesión con correo",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "juan.perez@ejemplo.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",
    forgotPassword: "¿Olvidaste tu contraseña?",
    rememberMe: "Recordarme",
    signInButton: "Iniciar Sesión",
    signingIn: "Iniciando sesión...",
    noAccount: "¿No tienes una cuenta?",
    createAccount: "Crear Cuenta",
    // Mensajes Toast
    toastSigningIn: "Iniciando sesión...",
    toastWelcomeBack: "¡Bienvenido de nuevo! 🎉",
    toastError: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
    toastConnectingGoogle: "Conectando con Google...",
    toastRedirectingGoogle: "Redirigiendo a Google...",
    toastGoogleError: "Error al conectar con Google. Por favor, inténtalo de nuevo.",
  },

  // Auth - Registrarse
  signUp: {
    title: "Crear Cuenta",
    subtitle: "Únete a Nimble y comienza a comprar",
    heroTitle: "Comienza tu viaje de muebles hoy",
    heroSubtitle: "Únete a miles de clientes felices que han transformado sus hogares con la colección curada de muebles de Nimble.",
    continueWithGoogle: "Continuar con Google",
    orSignUpWith: "O regístrate con correo",
    firstNameLabel: "Nombre",
    firstNamePlaceholder: "Juan",
    lastNameLabel: "Apellido",
    lastNamePlaceholder: "Pérez",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "juan.perez@ejemplo.com",
    phoneLabel: "Número de Teléfono",
    phonePlaceholder: "+52 (555) 000-0000",
    optional: "(Opcional)",
    passwordLabel: "Contraseña",
    confirmPasswordLabel: "Confirmar Contraseña",
    emailSubscription: "Quiero recibir correos sobre ofertas exclusivas, promociones y nuevos productos",
    createAccountButton: "Crear Cuenta",
    creatingAccount: "Creando cuenta...",
    termsAgreement: "Al crear una cuenta, aceptas nuestros",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    and: "y",
    haveAccount: "¿Ya tienes una cuenta?",
    signIn: "Iniciar Sesión",
    // Mensajes de validación
    passwordsNotMatch: "Las contraseñas no coinciden",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    // Mensajes Toast
    toastCreatingAccount: "Creando tu cuenta...",
    toastAccountCreated: "¡Cuenta creada! Revisa tu correo para verificar. Redirigiendo...",
    toastGoogleError: "Error al conectar con Google. Por favor, inténtalo de nuevo.",
  },

  // Auth - Página de Error
  authError: {
    title: "Error de Autenticación",
    subtitle: "Hubo un problema al iniciar sesión",
    description: "El código de autenticación proporcionado no es válido o ha expirado. Esto puede suceder si:",
    reasons: [
      "El enlace de inicio de sesión ya ha sido utilizado",
      "El enlace ha expirado (los enlaces son válidos por 24 horas)",
      "Hiciste clic en un enlace de verificación antiguo",
      "Hubo un problema con el proveedor de OAuth",
    ],
    tryAgain: "Intentar Iniciar Sesión de Nuevo",
    returnHome: "Volver al Inicio",
    needHelp: "¿Necesitas ayuda?",
    contactSupport: "Contactar soporte",
  },

  // Página de Perfil
  profile: {
    title: "Mi Perfil",
    backToHome: "← Volver al Inicio",
    // Barra lateral
    accountDetails: "Detalles de la Cuenta",
    orders: "Pedidos",
    wishlist: "Lista de Deseos",
    signOut: "Cerrar Sesión",
    // Sección de Foto
    photoTitle: "Foto de Perfil",
    uploadNewPhoto: "Subir Nueva Foto",
    uploading: "Subiendo...",
    adjustPhoto: "Ajustar Foto",
    photoHint: "JPG, PNG o GIF. Tamaño máximo 2MB.",
    cropHint: "Arrastra para reposicionar • Usa las teclas +/− para zoom",
    savePosition: "Guardar Posición",
    saving: "Guardando...",
    cancel: "Cancelar",
    // Mensajes Toast
    toastUploading: "Subiendo foto...",
    toastUploaded: "¡Foto subida! Haz clic en 'Ajustar Foto' para posicionarla 📸",
    toastInvalidFile: "Por favor, sube un archivo de imagen",
    toastFileTooLarge: "El tamaño de la imagen debe ser menor a 2MB",
    toastSavingCrop: "Guardando tu recorte perfecto...",
    toastCropSaved: "¡Posición de la foto guardada perfectamente! 🎯",
    toastUploadFailed: "Error al subir la foto",
    toastSaveFailed: "Error al guardar la posición",
    // Información Personal
    personalInfoTitle: "Información Personal",
    edit: "Editar",
    firstNameLabel: "Nombre",
    lastNameLabel: "Apellido",
    emailLabel: "Correo Electrónico",
    emailHint: "El correo no se puede cambiar",
    phoneLabel: "Número de Teléfono",
    saveChanges: "Guardar Cambios",
    // Mensajes Toast
    toastSavingProfile: "Guardando perfil...",
    toastProfileSaved: "¡Perfil actualizado exitosamente! 🎉",
    toastProfileError: "Error al actualizar el perfil. Por favor, inténtalo de nuevo.",
  },

  // Dashboard - Hero
  hero: {
    categories: {
      saleItems: "Artículos en Oferta",
      pressTables: "Mesas Press",
      lighting: "Iluminación",
      spokeSofa: "Sofá Spoke",
      storage: "Almacenamiento",
      turnChairs: "Sillas Turn",
      chairs: "Sillas",
      curveCoat: "Perchero Curve",
      bendChairs: "Sillas Bend",
      accessories: "Accesorios",
    },
    slides: [
      {
        eyebrow: "Elegancia Moderna",
        title: "Sofá Spoke",
        cta: "Ver Colección",
      },
      {
        eyebrow: "Gracia Contemporánea",
        title: "Comedor y Cocina",
        cta: "Ver Colección",
      },
      {
        eyebrow: "Diseño Atemporal",
        title: "Sala de Estar",
        cta: "Ver Colección",
      },
    ],
  },

  // Dashboard - Nuevos Arribos
  newArrivals: {
    title: "Nuevos Arribos",
    subtitle: "Las divisiones tradicionales entre el espacio personal y profesional.",
    hotItems: "Artículos Populares",
  },

  // Dashboard - Venta Relámpago
  flashSale: {
    title: "¡Venta Relámpago en curso!",
    subtitle: "Ahorra en mesas de oficina modernas, más vendidos + más",
    code: "Usa el Código: FLASH30",
  },

  // Dashboard - Productos Destacados
  featuredProducts: {
    categories: {
      danishDesign: "Diseño Danés",
      cottonCollection: "Colección de Algodón",
      minimalismStyle: "Estilo Minimalista",
      nightstand: "Mesa de Noche",
    },
    products: [
      {
        category: "Diseño Danés",
        name: "Marco de Silla Grid",
        price: "$309.00",
      },
      {
        category: "Colección de Algodón",
        name: "Toalla de Té Lunara",
        price: "$27.00",
      },
      {
        category: "Estilo Minimalista",
        name: "Lámpara de Mesa Sculpt",
        price: "$415.00",
      },
      {
        category: "Mesa de Noche",
        name: "Estantes Pixel",
        price: "$85.00",
      },
    ],
    shopButton: "Comprar",
  },

  // Dashboard - Comprar por Categoría
  shopByCategory: {
    title: "Comprar por Categorías",
    shopAllProducts: "Ver Todos los Productos",
    categories: {
      saleItems: "Artículos en Oferta",
      pressTables: "Mesas Press",
      lighting: "Iluminación",
      spokeSofa: "Sofá Spoke",
      storage: "Almacenamiento",
      turnChairs: "Sillas Turn",
      longeChairs: "Sillas Longe",
      curveCoat: "Perchero Curve",
      crossTables: "Mesas Cross",
      bendChairs: "Sillas Bend",
      barChairs: "Sillas de Bar",
      accessories: "Accesorios",
    },
  },

  // Dashboard - Colecciones Destacadas
  featuredCollections: {
    title: "Colecciones Destacadas",
    collections: [
      {
        name: "Vida Patrimonial",
        description: "Con una forma inspirada en las bitas utilizadas para asegurar embarcaciones a un muelle",
        cta: "Ver Colección",
      },
      {
        name: "La Colección Haven",
        description: "Con una forma inspirada en las bitas utilizadas para asegurar embarcaciones a un muelle",
        cta: "Ver Colección",
      },
      {
        name: "Serie Solace",
        description: "Con una forma inspirada en las bitas utilizadas para asegurar embarcaciones a un muelle",
        cta: "Ver Colección",
      },
    ],
  },

  // Dashboard - Testimonios
  testimonials: {
    title: "Nuestros Productos Favoritos",
    items: [
      {
        text: "Todos los productos son auténticos e importados del país de origen.",
        author: "Sarah Johnson",
        location: "Nueva York, NY",
      },
      {
        text: "La calidad y artesanía superaron todas mis expectativas.",
        author: "Michael Chen",
        location: "San Francisco, CA",
      },
      {
        text: "Diseño hermoso que complementa perfectamente la decoración de nuestro hogar.",
        author: "Emma Williams",
        location: "Austin, TX",
      },
    ],
  },

  // Dashboard - Espacios Inspiradores
  inspiredSpaces: {
    title: "Inspírate con Espacios",
  },

  // Dashboard - Banners Promocionales
  promoBanners: {
    banners: [
      {
        title: "Sillas Turn",
        description: "¡Eleva tu espacio con 40% de descuento en nuestros diseños atemporales!",
        discount: "40%",
        label: "Ahorra",
        cta: "Comprar Ahora",
      },
      {
        title: "Sillas Cross",
        description: "¡Obtén 30% de descuento en asientos elegantes y atemporales, no te lo pierdas!",
        discount: "30%",
        label: "Ahorra",
        cta: "Comprar Ahora",
      },
    ],
  },

  // Dashboard - Compra Nuestras Ofertas
  shopOurOffers: {
    title: "Compra Nuestras Ofertas",
    subtitle: "Las divisiones tradicionales entre el espacio personal y profesional.",
    shopAllProducts: "Ver Todos los Productos",
    badges: {
      sale: "Oferta",
      new: "Nuevo",
      sellingFast: "Se Vende Rápido",
    },
  },

  // Dashboard - Características del Enfoque
  approachFeatures: {
    title: "Este enfoque resultó en la hermosa estructura",
    badges: {
      ecoLabel: "Todo Eco-Certificado",
      protection: "Protección del Producto",
      makeItYours: "Hazlo Tuyo",
      tailored: "Único y Personalizado",
    },
    features: [
      {
        title: "Cómodo",
        description: "La Silla Bow está disponible en Roble Natural o Teñido de Negro con certificación completa de Ecolabel de la UE.",
      },
      {
        title: "Transparencia de precios",
        description: "Los precios justos aseguran que sepas exactamente por qué estás pagando, sin costos ocultos ni sobrecargos.",
      },
      {
        title: "Todo eco-certificado",
        description: "Todos los productos consideran un impacto ambiental más holístico y están diseñados para una vida útil más larga.",
      },
      {
        title: "Sostenibilidad",
        description: "Comprometidos con prácticas sostenibles, abastecimiento ético y reducción del impacto ambiental.",
      },
    ],
  },

  // Dashboard - Conoce a Nuestro Equipo
  meetOurTeam: {
    title: "Conoce a Nuestro Equipo",
    subtitle: "Las mentes creativas detrás de nuestro estudio",
    description: "Como diseñadores, constantemente estamos pensando en cómo vive la gente y qué problemas podríamos resolver para ellos.",
    features: [
      "Producto localmente en Nueva York",
      "Calificación de 4.8",
      "Más de 50 Productos",
    ],
    cta: "Contáctanos",
  },

  // Dashboard - Testimonios de Clientes
  clientTestimonials: {
    title: "Lo Que Dicen Nuestros Clientes",
    items: [
      {
        text: "Los productos son artísticos, divertidos, tienen una historia tan única como los diseñadores que los hicieron.",
      },
      {
        text: "Cada pieza es como una obra maestra, combinando diseño y autenticidad bellamente.",
      },
      {
        text: "El mejor abrigo que he tenido, calidad y materiales increíbles en todo.",
      },
    ],
  },

  // Dashboard - Feed de Instagram
  instagram: {
    title: "Estamos en Instagram",
    handle: "@Garage_store",
  },

  // Dashboard - Chips de Categoría
  categoryChips: {
    categories: [
      "Sala de Estar",
      "Macetas",
      "Alfombra Gravel",
      "Espejo de Mesa",
      "Vajilla de Mesa",
      "Decoración de Comedor",
      "Lámpara de Mesa Ray",
      "Dormitorio",
    ],
  },

  // Pie de Página
  footer: {
    customerService: {
      title: "Servicio al Cliente",
      hours: "Lun-Sáb, 9am-6pm EST.",
      callUs: "Llámanos",
      phone: "+1 888-234-1234 (gratis)",
      getInTouch: "Ponte en Contacto",
      email: "touch@garacestore.com",
      address: "Dirección",
      addressLine: "382 NE 191st St # 87394 Miami",
    },
    newsletter: {
      title: "Únete a Nuestro Boletín",
      description: "Suscríbete a nuestro boletín y recibe 10% de descuento en tu primer pedido.",
      placeholder: "Ingresa tu correo",
      button: "Suscribirse",
      agreement: "Al suscribirte aceptas los",
      termsOfService: "Términos de Servicio",
      privacyPolicy: "Política de Privacidad",
      and: "y la",
    },
    company: {
      title: "Compañía",
      aboutUs: "Sobre nosotros",
      contact: "Contacto",
      faqs: "Preguntas Frecuentes",
      blog: "Blog",
      findStore: "Encuentra una Tienda",
    },
    collection: {
      title: "Colección",
      tables: "Mesas",
      bowChairs: "Sillas Bow",
      turnTable: "Mesa Turn",
      turnChair: "Silla Turn",
      crossBarChair: "Silla Cross Bar",
    },
    shop: {
      title: "Tienda",
      sofas: "Sofás",
      outdoor: "Exterior",
      seating: "Asientos",
      lighting: "Iluminación",
      accessories: "Accesorios",
    },
    bottom: {
      unitedStates: "Estados Unidos (USD $)",
      copyright: "© 2025 Hyper Garace. Desarrollado por Shopify",
      termsOfService: "Términos de Servicio",
      privacyPolicy: "Política de Privacidad",
    },
  },

  // UI Común
  common: {
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    confirm: "Confirmar",
    close: "Cerrar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    submit: "Enviar",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    viewAll: "Ver Todo",
    learnMore: "Saber Más",
    readMore: "Leer Más",
    shopNow: "Comprar Ahora",
  },
} as const;
